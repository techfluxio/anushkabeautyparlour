import { Link } from 'react-router-dom'; import Reveal from './Reveal.jsx'; import AnimatedButton from './AnimatedButton.jsx'; import { Arrow, WhatsApp } from './icons.jsx'; import { SHRINGAR, waUrl, BUSINESS } from '../config/business.js';
export default function ShringarMahalSection() {
    const u = '✨ Namaste, Shringar Mahal ✨\n\nI would like to enquire about your bangles, jewellery and accessories. Could you please share the available designs?\n\nThank you 🙏';
    return <section className="alt" id="shringar"><div className="wrap"><Reveal><h2>Explore Shringar Mahal</h2><span className="bar" /><p className="sub">Bangles, jewellery, ornaments and beautiful accessories for every occasion.</p></Reveal>
        <div className="grid">{SHRINGAR.map((c, n) => <Reveal key={c.slug} delay={n * 50}><Link className="tile sq" to={'/shringar-mahal#' + c.slug}><span className="ph"><img loading="lazy" src={`/img/sh-${c.slug}.jpg`} alt={c.name} /></span><span className="lbl left">{c.name} <Arrow /></span></Link></Reveal>)}</div>
        <div className="cta mt"><AnimatedButton variant="outline" to="/shringar-mahal" iconRight={<Arrow />}>Explore All Categories</AnimatedButton>
            <AnimatedButton variant="whatsapp" href={u || undefined} disabled={!BUSINESS.whatsapp} iconLeft={<WhatsApp />}>WhatsApp Enquiry</AnimatedButton></div>
        <p className="small">Visit the shop or message us for availability. No online sales.</p></div></section>
}
