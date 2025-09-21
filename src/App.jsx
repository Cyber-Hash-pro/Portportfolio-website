import React from 'react'
import './global.css'
import MainRoutes from './Routes/MainRoutes.jsx'
// import Navabar from './components/Navbar.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {
  return (
    <div className='Father_class overflow-x-hidden'>
<Navbar />

      <MainRoutes />
      
    </div>
  )
}

export default App

// px-3 py-1 backdrop-blur-xs text-center   w-20 rounded-full h-20   text-sm font-medium shadow-lg bg-transparent 
///* From https://css.glass */
// background: rgba(255, 255, 255, 0.16);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(0px);
// -webkit-backdrop-filter: blur(0px);
  // <div className="absolute inset-0 bg-[url('bg.png')] opacity-10"></div>
  //     <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
  //     <div classNam