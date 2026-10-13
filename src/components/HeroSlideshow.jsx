import {useEffect,useState} from 'react';
const SLIDES=[{src:'/img/parlour-main.jpg',alt:'Salon interior with lit mirrors and styling chairs',pos:'50% 55%'},{src:'/img/hero.jpg',alt:'Styling chairs, mirror and product shelves',pos:'50% 50%'},{src:'/img/parlour-wash.jpg',alt:'Hair-washing area of the salon',pos:'50% 45%'}];
export default function HeroSlideshow(){
 const [i,setI]=useState(0);
 const [still]=useState(()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{SLIDES.forEach(s=>{const im=new Image();im.src=s.src})},[]);
 useEffect(()=>{if(still)return;let t;
  const arm=()=>{t=setTimeout(()=>setI(n=>(n+1)%SLIDES.length),5000)};
  const vis=()=>{clearTimeout(t);if(!document.hidden)arm()};
  arm();document.addEventListener('visibilitychange',vis);
  return()=>{clearTimeout(t);document.removeEventListener('visibilitychange',vis)}},[i,still]); // re-armed on every change: single timer, resets on manual click
 return <><div className="slides" aria-hidden="false">
   {SLIDES.map((s,n)=><img key={s.src} className={'slide'+(n===i?' active':'')} src={s.src} alt={n===i?s.alt:''} aria-hidden={n!==i} style={{objectPosition:s.pos}} decoding="async" fetchPriority={n===0?'high':'low'}/>)}
   <div className="scrim"/></div>
  <div className="dots" role="group" aria-label="Choose hero image">{SLIDES.map((s,n)=><button key={n} className={n===i?'on':''} aria-label={`Show image ${n+1} of ${SLIDES.length}`} aria-current={n===i} onClick={()=>setI(n)}/>)}</div></>}
