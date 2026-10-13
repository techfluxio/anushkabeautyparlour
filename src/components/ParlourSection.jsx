import Reveal from './Reveal.jsx'; import AnimatedButton from './AnimatedButton.jsx'; import { Arrow } from './icons.jsx';
export default function ParlourSection() {
    return <section id="parlour"><div className="wrap two"><Reveal><h2>Our Parlour</h2><span className="bar" />
        <p className="sub">A comfortable and hygienic space designed for your beauty and relaxation. Visit us for your beauty needs and explore our range of beauty and shringar products.</p>
        <AnimatedButton to="/#gallery" iconRight={<Arrow />}>View Gallery</AnimatedButton></Reveal>
        <Reveal className="pg" delay={100}><img className="m" loading="lazy" src="/img/parlour-main.jpg" alt="Salon interior with mirrors and styling stations" /><img loading="lazy" src="/img/parlour-wash.jpg" alt="Hair-washing area" /><img loading="lazy" src="/img/parlour-shelves.jpg" alt="Product shelves" /></Reveal></div></section>
}
