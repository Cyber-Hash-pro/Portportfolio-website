import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function FlowingMenu({ items = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial animation for the entire menu
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div className="w-full h-full overflow-hidden" ref={containerRef}>
      <nav className="flex flex-col h-full m-0 p-0 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-indigo-900/5 -z-10"></div>
        
        {/* Animated border elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        
        {items.map((item, idx) => (
          <EnhancedMenuItem key={idx} {...item} index={idx} totalItems={items.length} />
        ))}
      </nav>
    </div>
  );
}

function EnhancedMenuItem({ link, text, image, index, totalItems }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const textRef = useRef(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  useEffect(() => {
    // Staggered entrance animation for each menu item
    gsap.from(itemRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'back.out(1.7)'
    });
  }, [index]);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !textRef.current) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({ defaults: animationDefaults });
    
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to(textRef.current, { 
        color: '#060010',
        scale: 1.05,
        duration: 0.3
      })
      .to([marqueeRef.current, marqueeInnerRef.current], { 
        y: '0%' 
      }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current || !textRef.current) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({ defaults: animationDefaults });
    
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to(textRef.current, { 
        color: '#ffffff',
        scale: 1,
        duration: 0.3
      }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className="text-[#060010] uppercase font-semibold text-[4vh] leading-[1.2] p-[1vh_1vw_0] flex items-center">
        {text}
        {/* Animated arrow indicator */}
        <svg 
          className="ml-3 w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M14.4291 18.8201C14.2391 18.8201 14.0491 18.7501 13.8991 18.6001C13.6091 18.3101 13.6091 17.8301 13.8991 17.5401L19.4391 12.0001L13.8991 6.46012C13.6091 6.17012 13.6091 5.69012 13.8991 5.40012C14.1891 5.11012 14.6691 5.11012 14.9591 5.40012L21.0291 11.4701C21.3191 11.7601 21.3191 12.2401 21.0291 12.5301L14.9591 18.6001C14.8091 18.7501 14.6191 18.8201 14.4291 18.8201Z" 
            fill="#060010" 
          />
          <path 
            d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z" 
            fill="#060010" 
          />
        </svg>
      </span>
      <div
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center shadow-lg border-2 border-white/30"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div 
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_rgba(255,255,255,0.2)]"
      ref={itemRef}
      style={{
        background: `linear-gradient(${index % 2 === 0 ? 'to right' : 'to left'}, transparent, rgba(255,255,255,0.03), transparent)`
      }}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-white text-[4vh] transition-all duration-300 hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={textRef}
      >
        {/* Animated number indicator */}
        <span className="absolute left-5 text-purple-300/70 text-[2vh] font-mono">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        
        {text}
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </a>
      
      {/* Enhanced marquee with gradient edges */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-r from-purple-100 to-indigo-100 translate-y-[101%]"
        ref={marqueeRef}
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-purple-100 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-indigo-100 to-transparent z-10"></div>
        
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;