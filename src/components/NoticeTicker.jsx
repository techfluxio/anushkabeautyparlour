import {useEffect,useRef,useState} from 'react';
/* Reads public/notice.txt (one notice per line, # = comment). Scrolls right to left in a slow loop.
   The notice is repeated just enough times to fill the screen, so there is no big empty gap on wide screens. */
export default function NoticeTicker(){
 const [items,setItems]=useState([]);const measure=useRef(null);const [reps,setReps]=useState(1);const [dur,setDur]=useState(60);
 useEffect(()=>{let ok=true;
  fetch('/notice.txt',{cache:'no-cache'}).then(r=>{const ct=r.headers.get('content-type')||'';return r.ok&&!ct.includes('text/html')?r.text():''})
   .then(t=>{if(ok)setItems(t.split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith('#')))}).catch(()=>{});
  return()=>{ok=false}},[]);
 useEffect(()=>{if(!items.length)return;
  const calc=()=>{const el=measure.current;if(!el||!el.offsetWidth)return;const W=el.offsetWidth;
   const r=Math.max(1,Math.ceil(window.innerWidth/W));setReps(r);setDur(Math.max(25,Math.round(r*W/45)))}; // about 45px per second
  calc();addEventListener('resize',calc);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(calc);
  return()=>removeEventListener('resize',calc)},[items]);
 if(!items.length)return null;
 const set=(k)=>items.map((t,i)=><span className="tk-item" key={k+'-'+i}>{t}<i aria-hidden="true">{'\u2726'}</i></span>);
 const group=(hidden)=><div className="tk-group" aria-hidden={hidden||undefined}>{Array.from({length:reps},(_,n)=>set(n))}</div>;
 return <div className="ticker" role="region" aria-label="Notice">
  <div className="tk-measure" ref={measure} aria-hidden="true">{set('m')}</div>
  <div className="tk-track" style={{'--dur':dur+'s'}}>{group(false)}{group(true)}</div></div>}