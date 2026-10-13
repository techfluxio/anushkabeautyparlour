import Reveal from '../components/Reveal.jsx'; import AnimatedButton from '../components/AnimatedButton.jsx'; import { WhatsApp } from '../components/icons.jsx'; import { SHRINGAR, waUrl, BUSINESS } from '../config/business.js'; import { usePageMeta } from '../lib/useReveal.js';
export default function ShringarMahalPage() {
    usePageMeta("Shringar Mahal | Bangles, Jewellery & Accessories | Samastipur", "Explore bangles, earrings, necklaces, bridal ornaments and women's accessories at Shringar Mahal, Bibhutipur, Samastipur.");
    return <><div className="pagehead"><div className="wrap"><h1>Shringar Mahal</h1><p className="sub">Bangles, jewellery, ornaments and beautiful accessories for every occasion. Visit the shop on Main Road, Bibhutipur, or message us to ask about availability.</p></div></div>
        <section className="tight"><div className="wrap">{SHRINGAR.map(c => <Reveal key={c.slug} className="sec-sh" id={c.slug}><img loading="lazy" src={`/img/sh-${c.slug}.jpg`} alt={c.name} /><div><h2 className="h3">{c.name}</h2><p className="sub">{c.text}</p>
            <AnimatedButton variant="whatsapp" href={waUrl('Hello, I would like to enquire about ' + c.name.replace('&', 'and') + ' at Shringar Mahal.') || undefined} disabled={!BUSINESS.whatsapp} iconLeft={<WhatsApp />}>WhatsApp Enquiry</AnimatedButton></div></Reveal>)}
            {!BUSINESS.whatsapp && <p className="note">WhatsApp number is not set yet. Add it in src/config/business.js.</p>}</div></section></>
}
