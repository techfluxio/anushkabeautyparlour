/* CENTRAL BUSINESS CONFIG - edit here (or use VITE_ env vars). Nothing here is secret. */
export const BUSINESS = {
  name: 'Anushka Beauty Parlour & Shringar Mahal',
  // ---- CHANGE THE SHOP ADDRESS HERE ----
  street: 'Block Road, Near SBI CSP Kapan, Bibhutipur',
  city: 'Samastipur',
  pin: '848236',
  state: 'Bihar',
  country: 'India',
  // --------------------------------------
  days: 'Monday \u2013 Sunday', time: '9:00 AM \u2013 8:00 PM',
  phone: import.meta.env.VITE_PHONE || '',          // e.g. +919XXXXXXXXX
  whatsapp: import.meta.env.VITE_WHATSAPP || '',    // digits with country code
  instagram: import.meta.env.VITE_INSTAGRAM || '',
  facebook: import.meta.env.VITE_FACEBOOK || '',
  // Exact shop location (Google Maps share link). Works even if VITE_MAPS_URL is not set.
  mapsShareUrl: import.meta.env.VITE_MAPS_URL || 'https://maps.app.goo.gl/eBmmVvarbWA1Lhno6',
  bookingEndpoint: import.meta.env.VITE_BOOKING_ENDPOINT || '' // Apps Script /exec URL
};

/* Emojis written as Unicode codes so they never turn into the replacement character */
export const E = {
  flower: '\u{1F338}', sparkle: '\u2728', pray: '\u{1F64F}',
  person: '\u{1F464}', phone: '\u{1F4F1}', lipstick: '\u{1F484}',
  calendar: '\u{1F4C5}', clock: '\u23F0', memo: '\u{1F4DD}'
};

export const telUrl = () => (BUSINESS.phone ? 'tel:' + BUSINESS.phone : '');
export const waUrl = (t) => (BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(t)}` : '');

/* Opens the exact shop location from the share link above. */
export const mapsUrl = () =>
  BUSINESS.mapsShareUrl || 'https://maps.app.goo.gl/eBmmVvarbWA1Lhno6';

export const SERVICES = [
  {name: 'Bridal Makeup', img: 'bridal'}, {name: 'Party Makeup', img: 'party'}, {name: 'Hair Care & Styling', img: 'hair'},
  {name: 'Facial & Skin Care', img: 'facial'}, {name: 'Mehndi Designs', img: 'mehndi'}
];
export const BOOKING_SERVICES = [...SERVICES.map(s => s.name), 'Other beauty service'];
export const SHRINGAR = [
  {slug: 'bangles', name: 'Bangles & Bridal Bangles', text: 'Colourful glass, metal and bridal bangle sets.'},
  {slug: 'earrings', name: 'Earrings', text: 'Traditional and contemporary earrings.'},
  {slug: 'necklaces', name: 'Necklaces & Jewellery Sets', text: 'Necklaces and matching jewellery sets.'},
  {slug: 'bridal-ornaments', name: 'Bridal Ornaments', text: 'Ornaments for brides and wedding occasions.'},
  {slug: 'accessories', name: "Women's Fashion Accessories", text: 'Everyday fashion accessories.'},
  {slug: 'essentials', name: 'Other Shringar Essentials', text: 'Bindis, hair accessories and more shringar needs.'}
];