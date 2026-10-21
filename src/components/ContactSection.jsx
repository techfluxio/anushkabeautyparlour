import Reveal from './Reveal.jsx'; import AnimatedButton from './AnimatedButton.jsx'; import { Pin, Phone, WhatsApp, Send } from './icons.jsx'; import { BUSINESS, E, telUrl, waUrl, mapsUrl } from '../config/business.js';
export const Socials = () => {
    const s = [['Instagram', BUSINESS.instagram], ['Facebook', BUSINESS.facebook]].filter(x => x[1]);
    return s.length ? <p className="soc">{s.map(([n, u], i) => <span key={n}>{i > 0 && ' · '}<a href={u} target="_blank" rel="noopener noreferrer">{n}</a></span>)}</p> : null
};
export default function ContactSection() {
    const t = telUrl(), w = waUrl(`${E.flower} Namaste, Anushka Beauty Parlour & Shringar Mahal ${E.flower}\n\nI would like to know more about your services. Could you please help me?\n\nThank you ${E.pray}`);
    return <section id="contact"><div className="wrap info">
        <Reveal><h3>Visit Us</h3><p><b>{BUSINESS.name}</b><br />{BUSINESS.street}<br />{BUSINESS.city}, {BUSINESS.state} - {BUSINESS.pin}</p><br /><AnimatedButton href={mapsUrl()} iconLeft={<Send />}>Get Directions</AnimatedButton></Reveal>
        <Reveal delay={80}><h3>Business Hours</h3><p>{BUSINESS.days}<br />{BUSINESS.time}</p></Reveal>
        <Reveal delay={160}><h3>Contact Us</h3><div className="stack"><AnimatedButton href={t || undefined} disabled={!t} iconLeft={<Phone />}>Call Now</AnimatedButton>
            <AnimatedButton variant="whatsapp" href={w || undefined} disabled={!BUSINESS.whatsapp} iconLeft={<WhatsApp />}>WhatsApp Us</AnimatedButton></div>
            {!t && !BUSINESS.whatsapp && <p className="note">Phone and WhatsApp numbers are not set yet. Add them in .env.</p>}<Socials /></Reveal></div></section>
}