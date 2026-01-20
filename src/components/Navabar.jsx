// ============================================
// NAVBAR COMPONENT
// ============================================
// Sticky navigation with glassmorphism blur,
// mobile hamburger menu, and hover effects

import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, personalInfo } from '../data/data';

const Navabar = () => {
  const audioRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#0A0908]/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative cursor-pointer"
          >
            {/* Animated Logo */}
            <motion.div
              className={`w-8 h-8 bg-gradient-to-br from-[#A9927D] to-[#D4C5B5] transition-all duration-300 flex items-center justify-center ${showTooltip ? 'rounded-lg scale-110' : 'rounded-full'
                }`}
              whileHover={{ rotate: 5 }}
            >
              <span className="text-black font-bold text-sm">N</span>
            </motion.div>

            {/* Popup card */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-0 w-64 bg-[#A9927D] rounded-xl p-4 shadow-xl z-50"
                >
                  <div className="space-y-2 text-left">
                    <p className="font-bold text-white">Hello 👋</p>
                    <p className="text-sm text-white/90 leading-tight">
                      Thanks for visiting! If you like what you see and need me to work on a project, send me a message.
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-[#A9927D] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/" className="font-semibold font-[font8] text-base md:text-lg text-gray-100 hover:text-[#A9927D] transition-colors">
            {personalInfo.name}
          </Link>
          <audio ref={audioRef} src="normalbutton.mp3" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center font-[font1] gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => audioRef.current?.play()}
              className={`relative py-2 transition-colors duration-200 ${isActive(link.path)
                  ? 'text-[#A9927D]'
                  : 'text-gray-300 hover:text-white'
                }`}
            >
              {link.name}
              {/* Active indicator */}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#A9927D] rounded-full"
                />
              )}
            </Link>
          ))}

          <Link
            to="/contact"
            className="btn-primary text-sm px-6 py-2"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0
              }}
              className="block w-6 h-0.5 bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0
              }}
              className="block w-6 h-0.5 bg-white origin-center"
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#0A0908]/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 py-6 px-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        audioRef.current?.play();
                        setIsMenuOpen(false);
                      }}
                      className={`text-lg font-medium transition-colors ${isActive(link.path)
                          ? 'text-[#A9927D]'
                          : 'text-gray-300 hover:text-white'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary mt-2 px-8 py-3"
                  >
                    Get in touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navabar;
