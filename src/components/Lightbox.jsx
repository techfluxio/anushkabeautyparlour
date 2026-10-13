import { useEffect, useRef } from 'react';
export default function Lightbox({ items, index, setIndex }) {
    const d = useRef(null), sx = useRef(0); const open = index !== null;
    useEffect(() => { const el = d.current; if (!el) return; if (open && !el.open) el.showModal(); if (!open && el.open) el.close() }, [open]);
    const go = n => setIndex((n + items.length) % items.length);
    const key = e => { if (e.key === 'ArrowLeft') go(index - 1); if (e.key === 'ArrowRight') go(index + 1) };
    const it = items[index ?? 0];
    return <dialog ref={d} className="lb" aria-label="Image viewer" onClose={() => setIndex(null)} onKeyDown={key} onClick={e => { if (e.target === d.current || e.target.classList.contains('in')) setIndex(null) }}
        onTouchStart={e => { sx.current = e.touches[0].clientX }} onTouchEnd={e => { const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1)) }}>
        {open && <div className="in"><img src={it.src} alt={it.alt} /></div>}
        <button className="x" aria-label="Close image viewer" onClick={() => setIndex(null)}>&times;</button>
        <button className="p" aria-label="Previous image" onClick={() => go(index - 1)}>&#8249;</button><button className="n" aria-label="Next image" onClick={() => go(index + 1)}>&#8250;</button></dialog>
}
