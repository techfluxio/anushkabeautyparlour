import {useEffect,useState} from 'react';import {Link,useLocation} from 'react-router-dom';
const ITEMS=[['Home','/',''],['Services','/','#services'],['Shringar Mahal','/shringar-mahal',''],['Our Parlour','/','#parlour'],['Gallery','/','#gallery'],['Contact','/','#contact']];
export default function Header(){const [open,setOpen]=useState(false);const loc=useLocation();
 useEffect(()=>{setOpen(false)},[loc.pathname,loc.hash]);
 useEffect(()=>{const k=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 const on=(p,h)=>loc.pathname===p&&loc.hash===h;
 return <header className="site-header"><div className="wrap hd">
  <Link className="logo" to="/" aria-label="Anushka Beauty Parlour and Shringar Mahal, home"><img src="/img/logo.jpg" width="354" height="110" alt="Anushka Beauty Parlour & Shringar Mahal"/></Link>
  <button className="burger" aria-expanded={open} aria-controls="nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(o=>!o)}>
   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" aria-hidden="true">{open?<path d="M5 5l14 14M19 5L5 19"/>:<path d="M3 6h18M3 12h18M3 18h18"/>}</svg></button>
  <nav id="nav" className={open?'open':''} aria-label="Main"><ul>
   {ITEMS.map(([l,p,h])=><li key={l}><Link className={'navlink'+(on(p,h)?' on':'')} aria-current={on(p,h)?'page':undefined} to={p+h}>{l}</Link></li>)}
   <li><Link className="btn btn-primary btn-sm" to="/book-appointment">Book Appointment</Link></li></ul></nav></div></header>}
