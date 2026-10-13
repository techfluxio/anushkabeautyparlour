import { Link } from 'react-router-dom'; import { BUSINESS, telUrl, mapsUrl } from '../config/business.js'; import { Socials } from './ContactSection.jsx';
export default function Footer() {
    return <footer><div className="wrap"><div className="ft">
        <div><Link to="/" aria-label="Home"><img src="/img/logo.jpg" alt="Anushka Beauty Parlour & Shringar Mahal" width="354" height="110" className="flogo" /></Link><p>Makeup, skincare, hair care and shringar accessories in Bibhutipur, Samastipur.</p></div>
        <div><h4>Explore</h4><ul><li><Link to="/#services">Services</Link></li><li><Link to="/shringar-mahal">Shringar Mahal</Link></li><li><Link to="/#gallery">Gallery</Link></li><li><Link to="/book-appointment">Book Appointment</Link></li></ul></div>
        <div><h4>Business Hours</h4><p>{BUSINESS.days}<br />{BUSINESS.time}</p></div>
        <div><h4>Contact</h4><p>{BUSINESS.street}<br />{BUSINESS.city}, {BUSINESS.state}</p>{telUrl() && <p><a href={telUrl()}>{BUSINESS.phone}</a></p>}<p><a href={mapsUrl()} target="_blank" rel="noopener noreferrer">Get Directions</a></p><Socials /></div></div>
        <p className="copy">&copy; {new Date().getFullYear()} {BUSINESS.name}</p></div></footer>
}
