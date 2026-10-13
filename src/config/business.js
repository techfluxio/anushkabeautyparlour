/* CENTRAL BUSINESS CONFIG - edit here (or use VITE_ env vars). Nothing here is secret. */
export const BUSINESS = {
  name: 'Anushka Beauty Parlour & Shringar Mahal',
  street: 'Main Road, Bibhutipur', city: 'Samastipur', state: 'Bihar', country: 'India',
  days: 'Monday \u2013 Sunday', time: '9:00 AM \u2013 8:00 PM',
  phone: import.meta.env.VITE_PHONE || '',          // e.g. +919XXXXXXXXX
  whatsapp: import.meta.env.VITE_WHATSAPP || '',    // digits with country code
  instagram: import.meta.env.VITE_INSTAGRAM || '',
  facebook: import.meta.env.VITE_FACEBOOK || '',
  bookingEndpoint: import.meta.env.VITE_BOOKING_ENDPOINT || '' // Apps Script /exec URL
};
export const telUrl = () => (BUSINESS.phone ? 'tel:' + BUSINESS.phone : '');
export const waUrl = (t) => (BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(t)}` : '');
export const mapsUrl = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.state}, ${BUSINESS.country}`);
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
