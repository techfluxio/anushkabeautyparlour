import Hero from '../components/Hero.jsx'; import ServicesSection from '../components/ServicesSection.jsx'; import ShringarMahalSection from '../components/ShringarMahalSection.jsx'; import ParlourSection from '../components/ParlourSection.jsx'; import GallerySection from '../components/GallerySection.jsx'; import BenefitsSection from '../components/BenefitsSection.jsx'; import ContactSection from '../components/ContactSection.jsx'; import { usePageMeta } from '../lib/useReveal.js';
export default function Home() {
    usePageMeta('Anushka Beauty Parlour & Shringar Mahal | Bibhutipur, Samastipur', 'Bridal and party makeup, hair care, facials, mehndi and a shringar shop for bangles and jewellery. Main Road, Bibhutipur, Samastipur, Bihar.');
    return <><Hero /><ServicesSection /><ShringarMahalSection /><ParlourSection /><GallerySection /><BenefitsSection /><ContactSection /></>
}
