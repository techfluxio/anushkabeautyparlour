import {BUSINESS} from '../config/business.js';
const today=()=>{const d=new Date();return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
export {today};
export const normPhone=v=>v.replace(/[\s-]/g,'').replace(/^(\+?91|0)/,'');
export function validate(v){const e={};
 if(v.name.trim().length<2)e.name='Please enter your name.';
 if(!/^[6-9]\d{9}$/.test(normPhone(v.phone)))e.phone='Enter a valid 10-digit mobile number.';
 if(!v.service)e.service='Please choose a service.';
 if(!v.date||v.date<today())e.date='Choose today or a future date.';
 if(!v.time||v.time<'09:00'||v.time>'20:00')e.time='Choose a time between 9:00 AM and 8:00 PM.';return e}
export async function submitBooking(v,requestId){
 const r=await fetch(BUSINESS.bookingEndpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...v,phone:normPhone(v.phone),requestId})});
 const j=await r.json();if(!r.ok||!j.ok)throw new Error(j.error||'Request failed');return j}
