import Reveal from './Reveal.jsx';import {Staff,Shield,Gem,Tag} from './icons.jsx';
export default function BenefitsSection(){return <div className="ben"><div className="wrap"><ul>{[[Staff,'Experienced Staff'],[Shield,'Hygiene & Cleanliness'],[Gem,'Quality Products'],[Tag,'Affordable Prices']].map(([I,t],n)=><Reveal as="li" key={t} delay={n*60}><I/>{t}</Reveal>)}</ul></div></div>}
