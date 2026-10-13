import {useEffect} from 'react';import {Routes,Route,useLocation} from 'react-router-dom';
import Header from './components/Header.jsx';import Footer from './components/Footer.jsx';import Home from './pages/Home.jsx';import ShringarMahalPage from './pages/ShringarMahalPage.jsx';import BookingPage from './pages/BookingPage.jsx';import NotFound from './pages/NotFound.jsx';
function ScrollManager(){const {pathname,hash}=useLocation();
 useEffect(()=>{if(hash){const t=setTimeout(()=>document.getElementById(hash.slice(1))?.scrollIntoView(),50);return()=>clearTimeout(t)}window.scrollTo(0,0)},[pathname,hash]);return null}
export default function App(){return <><a href="#main" className="skip">Skip to content</a><ScrollManager/><Header/>
 <main id="main"><Routes><Route path="/" element={<Home/>}/><Route path="/shringar-mahal" element={<ShringarMahalPage/>}/><Route path="/book-appointment" element={<BookingPage/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>}
