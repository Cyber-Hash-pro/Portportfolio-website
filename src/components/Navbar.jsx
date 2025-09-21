import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const audioRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-gray-800 flex items-center z-50 justify-between px-4 md:px-8 py-4 relative">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div 
          onMouseEnter={() => setShow(true)} 
          onMouseLeave={() => setShow(false)} 
          className="relative cursor-pointer group"
        >
          {/* Animated logo container */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Circle that transforms to square */}
            <div className={`absolute w-6 h-6 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 ease-in-out 
              ${show ? 'rounded-md scale-110 rotate-12' : 'rounded-full group-hover:scale-110 group-hover:rotate-12'} shadow-lg`}>
            </div>
            
            {/* Initial "N" letter */}
            <span className="text-xs font-bold text-white relative z-10">N</span>
          </div>

          {/* Popup card */}
          {show && (
            <div 
              className="absolute top-10 left-0 w-64 bg-gray-800 border border-amber-500/20 rounded-lg p-4 shadow-xl z-50
                transform origin-top-left transition-all duration-300 ease-out"
              style={{animation: 'fadeInScale 0.3s ease-out forwards'}}
            >
              <div className="space-y-2 text-left">
                <p className="font-bold text-amber-400 flex items-center gap-2">
                  <span>Hello 👋</span>
                </p>
                <p className="text-sm text-gray-300 leading-tight">
                  Thanks for visiting my Portfolio website! If you like what you see and you need me to work on a product, send me a message
                </p>
              </div>
              
              {/* Small triangle indicator */}
              <div className="absolute -top-2 left-3 w-4 h-4 rotate-45 bg-gray-800 border-t border-l border-amber-500/20"></div>
            </div>
          )}
        </div>
        
        <Link to="/" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 text-lg md:text-xl tracking-tight">
          Nilesh Patil
        </Link>
        <audio ref={audioRef} src="normalbutton.mp3"/>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        <Link 
          to="/" 
          onMouseEnter={() => audioRef.current.play()} 
          className="text-gray-300 hover:text-amber-400 transition-all duration-200 relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
        </Link>
        
        <Link 
          to="/projects" 
          onMouseEnter={() => audioRef.current.play()} 
          className="text-gray-300 hover:text-amber-400 transition-all duration-200 relative group"
        >
          Projects
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
        </Link>
        
        <Link 
          to="/blogs" 
          onMouseEnter={() => audioRef.current.play()} 
          className="text-gray-300 hover:text-amber-400 transition-all duration-200 relative group"
        >
          Blogs
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
        </Link>
        
        <Link 
          to="/about" 
          onMouseEnter={() => audioRef.current.play()} 
          className="text-gray-300 hover:text-amber-400 transition-all duration-200 relative group"
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
        </Link>
        
        <Link 
          to="/contact" 
          onMouseEnter={() => audioRef.current.play()}
          className="relative px-5 py-2.5 overflow-hidden font-medium text-amber-600 bg-gray-800 border border-amber-500/30 rounded-lg shadow-inner group"
        >
          <span className="absolute top-0 left-0 w-0 h-full bg-amber-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative group-hover:text-gray-900 font-bold">Get in touch</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden bg-gray-800 hover:bg-gray-750 flex flex-col gap-1.5 p-2.5 rounded-lg transition-all duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-amber-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-amber-500 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-amber-500 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg border-b border-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
        <div className="flex flex-col items-center gap-2 py-5 px-4">
          <Link 
            to="/" 
            onClick={() => {audioRef.current.play(); setIsMenuOpen(false);}} 
            className="w-full text-center py-3 text-gray-300 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            Home
          </Link>
          
          <Link 
            to="/projects" 
            onClick={() => {audioRef.current.play(); setIsMenuOpen(false);}} 
            className="w-full text-center py-3 text-gray-300 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            Projects
          </Link>
          
          <Link 
            to="/blogs" 
            onClick={() => {audioRef.current.play(); setIsMenuOpen(false);}} 
            className="w-full text-center py-3 text-gray-300 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            Blogs
          </Link>
          
          <Link 
            to="/about" 
            onClick={() => {audioRef.current.play(); setIsMenuOpen(false);}} 
            className="w-full text-center py-3 text-gray-300 hover:text-amber-400 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            About
          </Link>
          
          <Link 
            to="/contact" 
            onClick={() => {setIsMenuOpen(false); audioRef.current.play();}}
            className="w-full max-w-xs text-center py-3.5 mt-2 font-bold text-amber-600 bg-gray-800 border border-amber-500/30 rounded-lg hover:bg-amber-600 hover:text-gray-900 transition-all duration-300"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;