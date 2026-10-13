import useReveal from '../lib/useReveal.js';
export default function Reveal({as:T='div',delay=0,className='',children,...p}){const ref=useReveal();
 return <T ref={ref} className={`reveal ${className}`} style={{'--d':delay+'ms'}} {...p}>{children}</T>}
