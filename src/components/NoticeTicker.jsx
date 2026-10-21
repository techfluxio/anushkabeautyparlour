import {useEffect,useRef,useState} from 'react';
/* Reads public/notice.txt (one notice per line, # = comment). Scrolls right to left in a slow loop. */
export default function NoticeTicker(){
 const [items,setItems]=useState([]);const track=useRef(null);const [dur,setDur]=useState(60);
 useEffect(()=>{let ok=true;
  fetch('/notice.txt',{cache:'no-cache'}).then(r=>{const ct=r.headers.get('content-type')||'';return r.ok&&!ct.includes('text/html')?r.text():''})
   .then(t=>{if(ok)setItems(t.split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith('#')))}).catch(()=>{});
  return()=>{ok=false}},[]);
 useEffect(()=>{if(track.current&&items.length){const w=track.current.scrollWidth/2;setDur(Math.max(25,Math.round(w/45)))}},[items]); // about 45px per second
 if(!items.length)return null;
 const group=(hidden)=><div className="tk-group" aria-hidden={hidden||undefined}>{items.map((t,i)=><span className="tk-item" key={i}>{t}<i aria-hidden="true">{'\u2726'}</i></span>)}</div>;
 return <div className="ticker" role="region" aria-label="Notice"><div className="tk-track" ref={track} style={{'--dur':dur+'s'}}>{group(false)}{group(true)}</div></div>}