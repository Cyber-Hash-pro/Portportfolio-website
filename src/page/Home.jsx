import React, { useEffect, useState ,useRef } from 'react'
import Navabar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AboutIntro from '../components/AboutIntro.jsx'
import Introsection from '../components/Introsection.jsx'
import Footer from '../components/Footer.jsx'
import MouseFollower from '../components/MouserFollwer.jsx'
import FlowingMenu from '../components/Combinatio.jsx'

import TechStackMarquee from '../components/TechStackMarquee.jsx'

const Home = () => {

const demoItems = [
  { link: '#', text: 'Project', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Github', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'About', image: 'https://picsum.photos/600/400?random=3' },
];

 

  return (
   <div>
<Hero />

<TechStackMarquee/>


<Introsection/>


<Footer/>
<MouseFollower/>  

</div>
  )
}

export default Home;

