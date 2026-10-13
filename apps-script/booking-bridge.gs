/**
 * Anushka Beauty Parlour - booking bridge (Google Apps Script web app)
 * Website -> doPost -> real Google Form response -> email -> WhatsApp Cloud API
 *
 * SETUP
 * 1. Open your Google Form > Extensions > Apps Script. Paste this file.
 * 2. Project Settings > Script properties, add:
 *    FORM_ID, OWNER_EMAIL, WA_TOKEN, WA_PHONE_ID, WA_TO (e.g. 919XXXXXXXXX),
 *    WA_TEMPLATE (approved template name), WA_LANG (e.g. en)
 *    Template needs 6 body variables in this order:
 *    name, phone, service, date, time, requirements
 * 3. Run setup() once to see which items in FORM_TITLES do not match your form's questions.
 * 4. Deploy > New deployment > Web app > Execute as: Me, Access: Anyone.
 *    Copy the /exec URL into CONFIG.bookingEndpoint in the website.
 * Credentials live only in Script properties, never in the website.
 */
const FORM_TITLES = { name: 'Full name', phone: 'Mobile number', service: 'Service required',
  date: 'Preferred appointment date', time: 'Preferred appointment time', notes: 'Additional requirements' };

function setup() {
  const form = FormApp.openById(prop('FORM_ID'));
  const titles = form.getItems().map(i => i.getTitle());
  Object.values(FORM_TITLES).forEach(t => Logger.log((titles.includes(t) ? 'OK       ' : 'MISSING  ') + t));
}

function prop(k) { return PropertiesService.getScriptProperties().getProperty(k); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const err = validate(d); if (err) return out({ ok: false, error: err });
    const cache = PropertiesService.getScriptProperties();
    const seen = cache.getProperty('req_' + d.requestId);
    if (seen) return out(JSON.parse(seen)); // idempotent retry

    const form = FormApp.openById(prop('FORM_ID'));
    const resp = form.createResponse();
    form.getItems().forEach(item => {
      const key = Object.keys(FORM_TITLES).find(k => FORM_TITLES[k] === item.getTitle());
      if (!key || !d[key]) return;
      const t = item.getType();
      if (t === FormApp.ItemType.TEXT) resp.withItemResponse(item.asTextItem().createResponse(d[key]));
      else if (t === FormApp.ItemType.PARAGRAPH_TEXT) resp.withItemResponse(item.asParagraphTextItem().createResponse(d[key]));
      else if (t === FormApp.ItemType.MULTIPLE_CHOICE) resp.withItemResponse(item.asMultipleChoiceItem().createResponse(d[key]));
      else if (t === FormApp.ItemType.LIST) resp.withItemResponse(item.asListItem().createResponse(d[key]));
    });
    resp.submit(); // recorded in Form responses

    const result = { ok: true, recorded: true, email: notifyEmail(d), whatsapp: notifyWhatsApp(d) };
    cache.setProperty('req_' + d.requestId, JSON.stringify(result));
    return out(result);
  } catch (x) {
    console.error(x); return out({ ok: false, error: 'Server error' });
  } finally { lock.releaseLock(); }
}

function validate(d) {
  if (!d.requestId || !/^[\w-]{8,64}$/.test(d.requestId)) return 'Bad request';
  if (!d.name || d.name.length > 100) return 'Name is required';
  if (!/^[+\d][\d\s-]{8,15}$/.test(d.phone || '')) return 'Valid mobile number is required';
  if (!d.service || !d.date || !d.time) return 'Service, date and time are required';
  if ((d.notes || '').length > 500) return 'Requirements too long';
  return null;
}

function notifyEmail(d) {
  try {
    const body = ['Status: Awaiting confirmation', '', 'Name: ' + d.name, 'Mobile: ' + d.phone, 'Service: ' + d.service,
      'Preferred date: ' + d.date, 'Preferred time: ' + d.time, 'Additional requirements: ' + (d.notes || '-'),
      'Submitted: ' + new Date().toString()].join('\n');
    MailApp.sendEmail(prop('OWNER_EMAIL'), 'New Appointment Request \u2013 Anushka Beauty Parlour', body);
    return 'sent';
  } catch (x) { console.error('EMAIL FAIL', x); return 'failed'; }
}

function notifyWhatsApp(d) {
  if (!prop('WA_TOKEN')) return 'not_configured';
  const vals = [d.name, d.phone, d.service, d.date, d.time, d.notes || '-']
  .map(v => String(v).replace(/\s+/g, ' ').trim() || '-');
  for (let i = 0; i < 2; i++) { // one safe retry on 5xx/network
    try {
      const r = UrlFetchApp.fetch('https://graph.facebook.com/v20.0/' + prop('WA_PHONE_ID') + '/messages', {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        headers: { Authorization: 'Bearer ' + prop('WA_TOKEN') },
        payload: JSON.stringify({ messaging_product: 'whatsapp', to: prop('WA_TO'), type: 'template',
          template: { name: prop('WA_TEMPLATE'), language: { code: prop('WA_LANG') || 'en' },
            components: [{ type: 'body', parameters: vals.map(v => ({ type: 'text', text: String(v) })) }] } })
      });
      const c = r.getResponseCode();
      if (c < 300) return 'accepted_by_provider'; // accepted, not proof of delivery
      if (c < 500) { console.error('WA REJECTED', r.getContentText()); return 'failed'; }
    } catch (x) { console.error('WA ERR', x); }
    Utilities.sleep(1500);
  }
  return 'failed';
}
