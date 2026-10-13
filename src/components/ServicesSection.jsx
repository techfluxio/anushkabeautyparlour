import { Link } from 'react-router-dom'; import Reveal from './Reveal.jsx';
import { SERVICES } from '../config/business.js';
export default function ServicesSection() {
    return <section id="services"><div className="wrap"><Reveal><h2>Our Services</h2><span className="bar" /></Reveal>
        <div className="grid s6">{[...SERVICES.map(s => ({ ...s, to: '/book-appointment?s=' + encodeURIComponent(s.name), src: `/img/${s.img}.jpg` })), { name: 'Shringar Mahal', to: '/shringar-mahal', src: '/img/sh-bangles.jpg' }].map((s, n) =>
            <Reveal key={s.name} delay={n * 50}><Link className="tile" to={s.to}><span className="ph"><img loading="lazy" src={s.src} alt={s.name + (s.name === 'Shringar Mahal' ? ' bangles and jewellery' : '')} /></span><span className="lbl">{s.name}</span></Link></Reveal>)}</div></div></section>
}
