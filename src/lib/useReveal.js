import {useEffect,useRef} from 'react';
export default function useReveal(){const ref=useRef(null);
 useEffect(()=>{const el=ref.current;if(!el)return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){el.classList.add('in');return}
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('in');io.disconnect()}},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  io.observe(el);return()=>io.disconnect()},[]);return ref}
export function usePageMeta(title,desc){useEffect(()=>{document.title=title;const m=document.querySelector('meta[name=description]');if(m)m.setAttribute('content',desc)},[title,desc])}
