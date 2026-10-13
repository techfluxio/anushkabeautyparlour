# Anushka Beauty Parlour & Shringar Mahal - React website

React 18 + Vite + React Router. No animation libraries (CSS transitions only).

## Run / build
    npm install
    npm run dev        # local development
    npm run build      # outputs dist/
    npm run preview
Deploy dist/ to Netlify / Vercel / Cloudflare Pages. SPA fallback is included (public/_redirects, vercel.json) so /book-appointment works on refresh.

## 1. Business details (one place)
Edit src/config/business.js, or copy .env.example to .env and set VITE_PHONE, VITE_WHATSAPP (digits with country code), VITE_INSTAGRAM, VITE_FACEBOOK, VITE_BOOKING_ENDPOINT. These are public values, not secrets. Until set, Call/WhatsApp buttons are disabled with a note; nothing is invented.

## 2. Photos (replace before launch)
public/img/*.jpg are low-resolution crops of the design reference; the hero slideshow upscales them to full width, so they look soft. Replace with real photos using the same file names:
  parlour-main.jpg, hero.jpg, parlour-wash.jpg (hero slideshow + gallery), parlour-shelves.jpg, bridal/party/hair/facial/mehndi.jpg (services).
public/img/sh-*.svg are Shringar Mahal placeholders. Replace with real photos (change the extension in src/config/business.js usage if you use .jpg). logo.jpg and public/favicon.png are crops: replace with original brand files.

## 3. Booking, Google Form, email, WhatsApp
Flow: React form -> Apps Script web app (apps-script/booking-bridge.gs) -> real Google Form response -> email -> WhatsApp Cloud API.
1. Google Form questions titled exactly: Full name, Mobile number, Service required (dropdown with the 6 booking service names incl. "Other beauty service"), Preferred appointment date (short answer), Preferred appointment time (short answer), Additional requirements (paragraph).
2. Form > Extensions > Apps Script, paste booking-bridge.gs. Script properties: FORM_ID, OWNER_EMAIL, WA_TOKEN, WA_PHONE_ID, WA_TO, WA_TEMPLATE, WA_LANG.
3. Run setup() once, approve permissions, check the log shows OK for every field.
4. Deploy > Web app, Execute as Me, Access Anyone. Put the /exec URL in VITE_BOOKING_ENDPOINT, rebuild.
5. WhatsApp: Meta WhatsApp Business Cloud API; template APPROVED with 6 body variables (name, phone, service, date, time, requirements) and status text "Awaiting confirmation". Without WA_TOKEN the script reports whatsapp: not_configured and email still sends. A provider "accepted" response is not proof of delivery.
6. Duplicates: each submission has a requestId; retries return the stored result. Failures appear in Apps Script Executions logs; Form responses are the recovery source.

## 4. Verified vs not verified
Verified in headless Chromium (against the built app): no horizontal overflow and no console errors at 320-1600px on /, /shringar-mahal, /book-appointment, 404; hero card 500x~354 inside a 560px full-width hero; slideshow advances 1>2>3>1 every 5s with 0.9s crossfade, card position unchanged, dot click works, reduced-motion disables autoplay; primary button hover lifts 2px with shadow; lightbox open/arrow/Esc; mobile menu opens, closes on link click, anchor lands below the header; booking validation, unconfigured/failed/loading/success states against a MOCK endpoint, same requestId on retry.
NOT verified: real Google Form write, real email, real WhatsApp send, real-device touch testing, Lighthouse scores, mobile Safari.
