import AnimatedButton from './AnimatedButton.jsx'; import { Calendar, Phone } from './icons.jsx'; import { telUrl } from '../config/business.js';
export default function HeroContent() {
    const t = telUrl();
    return <div className="hero-card"><h1>For Your Special Moments</h1>
        <p className="lead">Makeup, skincare, hair care and all your beauty needs &mdash; under one roof.</p>
        <div className="cta"><AnimatedButton to="/book-appointment" iconLeft={<Calendar />}>Book Appointment</AnimatedButton>
            <AnimatedButton variant="outline" href={t || undefined} disabled={!t} iconLeft={<Phone />} title={t ? undefined : 'Phone number not set yet'}>Call Now</AnimatedButton></div></div>
}
