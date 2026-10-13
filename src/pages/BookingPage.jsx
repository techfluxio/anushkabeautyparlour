import { useRef, useState } from 'react'; import { Link, useSearchParams } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton.jsx'; import { Send, WhatsApp } from '../components/icons.jsx';
import { BUSINESS, BOOKING_SERVICES, waUrl } from '../config/business.js'; import { validate, submitBooking, today } from '../lib/booking.js'; import { usePageMeta } from '../lib/useReveal.js';
function Field({ id, label, error, children }) { return <div><label htmlFor={id}>{label}</label>{children}<div className="er" id={id + '-e'} role={error ? 'alert' : undefined}>{error}</div></div> }
export default function BookingPage() {
    usePageMeta('Book Appointment | Anushka Beauty Parlour', 'Request an appointment for bridal makeup, party makeup, hair care, facial or mehndi at Anushka Beauty Parlour, Samastipur.');
    const [sp] = useSearchParams(); const pre = sp.get('s');
    const [v, setV] = useState({ name: '', phone: '', service: BOOKING_SERVICES.includes(pre) ? pre : '', date: '', time: '', notes: '', website: '' });
    const [err, setErr] = useState({}); const [st, setSt] = useState({ k: 'idle', m: '' }); const rid = useRef(null);
    const set = e => setV(p => ({ ...p, [e.target.name]: e.target.value }));
    const ia = k => ({ id: k, name: k, value: v[k], onChange: set, 'aria-invalid': !!err[k], 'aria-describedby': k + '-e' });
    async function onSubmit(e) {
        e.preventDefault(); if (st.k === 'sending') return;
        const er = validate(v); setErr(er); if (Object.keys(er).length) { setSt({ k: 'error', m: 'Please fix the highlighted fields.' }); document.getElementById(Object.keys(er)[0])?.focus(); return }
        if (v.website) { setSt({ k: 'success', m: 'Thank you.' }); return }
        if (!BUSINESS.bookingEndpoint) { setSt({ k: 'error', m: 'Online booking is not activated yet, so nothing was sent. Please use \u201cBook via WhatsApp\u201d below or call us.' }); return }
        rid.current = rid.current || (crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random().toString(36).slice(2));
        setSt({ k: 'sending', m: '' });
        try { await submitBooking(v, rid.current); rid.current = null; setSt({ k: 'success', m: '' }) }
        catch (x) { setSt({ k: 'error', m: `We could not confirm that your request was received (${x.message || 'network error'}). Please try again or use WhatsApp. Retrying will not create a duplicate.` }) }
    }
    const wa = () => { const t = `Appointment request - ${BUSINESS.name}\nName: ${v.name || '-'}\nPhone: ${v.phone || '-'}\nService: ${v.service || '-'}\nDate: ${v.date || '-'}\nTime: ${v.time || '-'}\nNotes: ${v.notes || '-'}`; window.open(waUrl(t), '_blank', 'noopener') };
    return <section><div className="wrap narrow"><p><Link to="/" className="back">&larr; Back to home</Link></p><h1 className="h2">Book Your Appointment</h1><span className="bar" />
        <p className="sub">Fill in your preferred details. This sends an appointment <b>request</b>; we will confirm availability with you by call or WhatsApp. For Shringar Mahal products, please use the <Link to="/shringar-mahal">WhatsApp enquiry</Link> instead.</p>
        <div role="status" aria-live="polite">{st.m && <p className={'note ' + (st.k === 'error' ? 'bad' : 'ok')}>{st.m}</p>}</div>
        {st.k === 'success' ? <div className="box"><p className="note ok"><b>Request received.</b> Your appointment request has been recorded. It is <b>not confirmed yet</b>; we will contact you to confirm availability.</p><br /><AnimatedButton to="/">Back to home</AnimatedButton></div> :
            <form className="box" onSubmit={onSubmit} noValidate>
                <div className="fr"><Field id="name" label="Full name *" error={err.name}><input {...ia('name')} autoComplete="name" maxLength={100} /></Field>
                    <Field id="phone" label="Mobile number *" error={err.phone}><input {...ia('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" /></Field></div>
                <Field id="service" label="Service required *" error={err.service}><select {...ia('service')}><option value="">Select a service</option>{BOOKING_SERVICES.map(s => <option key={s}>{s}</option>)}</select></Field>
                <div className="fr"><Field id="date" label="Preferred date *" error={err.date}><input {...ia('date')} type="date" min={today()} /></Field>
                    <Field id="time" label="Preferred time *" error={err.time}><input {...ia('time')} type="time" min="09:00" max="20:00" /></Field></div>
                <div><label htmlFor="notes">Additional requirements (optional)</label><textarea id="notes" name="notes" rows={3} maxLength={500} value={v.notes} onChange={set} /></div>
                <div className="hp" aria-hidden="true"><label htmlFor="website">Leave empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set} /></div>
                <AnimatedButton type="submit" loading={st.k === 'sending'} iconLeft={<Send />}>{st.k === 'sending' ? 'Sending\u2026' : 'Submit Booking Request'}</AnimatedButton></form>}
        <div className="note mt">Prefer WhatsApp? This opens WhatsApp with your details; you must press send yourself. It is not a booking until we reply.<br /><br />
            <AnimatedButton variant="whatsapp" onClick={wa} disabled={!BUSINESS.whatsapp} iconLeft={<WhatsApp />}>Book via WhatsApp</AnimatedButton>{!BUSINESS.whatsapp && <p className="small">WhatsApp number is not set yet.</p>}</div></div></section>
}
