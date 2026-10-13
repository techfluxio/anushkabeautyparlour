import {useState} from 'react';import Reveal from './Reveal.jsx';import Lightbox from './Lightbox.jsx';
const ITEMS=[{src:'/img/parlour-main.jpg',alt:'Styling stations with lit mirrors'},{src:'/img/parlour-wash.jpg',alt:'Hair-washing area'},{src:'/img/parlour-shelves.jpg',alt:'Product shelves'},{src:'/img/hero.jpg',alt:'Salon chairs and mirror'}];
export default function GallerySection(){const [i,setI]=useState(null);
 return <section className="alt" id="gallery"><div className="wrap"><Reveal><h2>Gallery</h2><span className="bar"/></Reveal>
 <div className="gal">{ITEMS.map((g,n)=><Reveal key={g.src} delay={n*60}><button className="gitem" onClick={()=>setI(n)} aria-label={'View larger: '+g.alt}><img loading="lazy" src={g.src} alt={g.alt}/><span className="gov" aria-hidden="true">View</span></button></Reveal>)}</div></div>
 <Lightbox items={ITEMS} index={i} setIndex={setI}/></section>}
