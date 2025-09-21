import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls, Sphere, Text3D } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from 'three';

// Advanced 3D Particle Background with Interactive Effects
function AdvancedParticleBackground() {
  const ref = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(8000), { radius: 1.8 })
  );
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      // Mouse interaction
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x, 
        mouse.current.x * 0.2, 
        0.05
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y, 
        mouse.current.y * 0.2, 
        0.05
      );
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffa500"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// 3D Floating Name Component
function FloatingName() {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group position={[0, 0, -2]}>
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        NILESH
        <meshStandardMaterial color="#ffa500" emissive="#ff9500" emissiveIntensity={0.2} />
      </Text3D>
    </group>
  );
}

// Interactive Floating Shapes with Physics Simulation
const InteractiveFloatingShape = ({ index, total }) => {
  const shapes = ["circle", "square", "triangle", "hexagon", "star"];
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F9C80E", "#FF6B6B", "#A358DF", "#5EEAD4"];
  const shape = shapes[index % shapes.length];
  const color = colors[index % colors.length];
  
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  
  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={constraintsRef}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: 1.2, zIndex: 20 }}
      whileTap={{ scale: 1.1 }}
      initial={{ 
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        scale: 0,
        rotate: Math.random() * 360
      }}
      animate={{ 
        y: [null, Math.random() * 100 - 50],
        x: [null, Math.random() * 100 - 50],
        scale: 1,
        rotate: [0, 360]
      }}
      transition={{
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: Math.random() * 8 + 8,
          ease: "easeInOut"
        },
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: Math.random() * 8 + 8,
          ease: "easeInOut"
        },
        rotate: {
          repeat: Infinity,
          duration: Math.random() * 15 + 15,
          ease: "linear"
        },
        scale: {
          duration: 1.2,
          ease: "backOut"
        }
      }}
      style={{
        filter: isDragging ? "drop-shadow(0 0 8px rgba(255,165,0,0.7))" : "none"
      }}
    >
      <div 
        className={`${shape === "circle" ? "rounded-full" : shape === "triangle" ? "triangle-shape" : shape === "hexagon" ? "hexagon-shape" : shape === "star" ? "star-shape" : ""} 
          w-14 h-14 md:w-20 md:h-20 flex items-center justify-center shadow-lg relative group`}
        style={{ 
          background: `radial-gradient(circle at 30% 30%, ${color}44, ${color}22)`,
          border: `1px solid ${color}55`,
          backdropFilter: 'blur(10px)',
          clipPath: shape === "hexagon" ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" : 
                   shape === "star" ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" : "none"
        }}
      >
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          style={{ boxShadow: `0 0 20px ${color}40` }}></div>
        
        {shape === "triangle" && (
          <div className="-rotate-45 w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <polygon points="50,15 85,85 15,85" fill={color} />
            </svg>
          </div>
        )}
        
        {shape === "star" && (
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" fill={color} />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

// Advanced Animated Text Component with Typewriter Effect
const AdvancedAnimatedText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + Math.random() * 50);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text]);
  
  return (
    <motion.h1 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </motion.h1>
  );
};

// Holographic Card Component
const HolographicCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
      }}
    >
      {/* Holographic effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(255,255,255,0.1), transparent 70%)`,
        }}
      ></div>
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(255,165,0,0.1), transparent 70%)`,
          boxShadow: `0 0 60px rgba(255,165,0,0.1)`,
        }}
      ></div>
      
      {children}
    </div>
  );
};

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [isSplineError, setIsSplineError] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Rotate through skills
    const interval = setInterval(() => {
      setActiveSkill(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const skills = [
    "Full Stack Developer",
    "Problem Solver",
    "Creative Innovator"
  ];

  return (
    <main 
      ref={containerRef}
      className="w-full min-h-screen font-sans flex flex-col items-center px-4 md:px-8 text-center relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black"
    >
      {/* Advanced 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AdvancedParticleBackground />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Interactive Floating Shapes
      <div className="absolute inset-0 overflow-hidden z-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <InteractiveFloatingShape key={i} index={i} total={12} />
        ))}
      </div> */}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-60 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center pt-16 md:pt-24 pb-10"
        style={{ y, opacity }}
      >
        {/* Heading */}
        <motion.div 
          className="w-full mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AdvancedAnimatedText 
            text="Hello, I'm Nilesh Patil!" 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-left md:text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 pb-2"
            delay={0.2}
          />
        </motion.div>

        {/* 3D Model (Spline) with Holographic Effect */}
        <HolographicCard className="w-full max-w-4xl h-64 md:h-80 lg:h-96 mb-8 md:mb-12">
          <motion.div 
            className="relative w-full h-full rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-amber-500/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ 
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.3)",
              borderColor: "rgba(245, 158, 11, 0.4)"
            }}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="w-12 h-12 border-4 border-t-transparent border-amber-500 rounded-full mb-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <p className="text-gray-400 text-sm">Loading 3D experience...</p>
                </div>
              </div>
            )}
            
            {isSplineError ? (
              <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                <div className="w-40 h-40 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive 3D Model</h3>
                <p className="text-gray-400 max-w-md">Would display here with internet connection</p>
              </div>
            ) : (
              <Spline
                onError={() => {
                  setLoading(false);
                  setIsSplineError(true);
                  console.log("Spline failed to load");
                }}
                onLoad={() => setLoading(false)}
                scene="https://prod.spline.design/SGNca2ikt67k048p/scene.splinecode"
                className="w-full h-full"
              />
            )}
          </motion.div>
        </HolographicCard>

        {/* Subtitle with rotating skills */}
        <motion.div 
          className="px-4 mb-10 md:mb-16 w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSkill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"
              >
                {skills[activeSkill]}
              </motion.span>
            </AnimatePresence>
          </h2>
          
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            I build innovative digital solutions with modern technologies and a focus on user experience. 
            Passionate about creating efficient, scalable applications that solve real-world problems.
          </p>
          
          {/* CTA Buttons with advanced hover effects */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.button 
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 bg-transparent border border-amber-500 text-amber-500 hover:text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Contact Me</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Skills Highlight Section with 3D effect */}
        <motion.section 
          className="w-full max-w-4xl py-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-amber-500/20 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <HolographicCard className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-amber-500 h-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Full Stack Development</h4>
                <p className="text-gray-400 text-sm">Creating end-to-end web applications with modern technologies and best practices.</p>
              </motion.div>
            </HolographicCard>
            
            <HolographicCard className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-indigo-500 h-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Problem Solving</h4>
                <p className="text-gray-400 text-sm">Analyzing complex challenges and developing efficient, scalable solutions.</p>
              </motion.div>
            </HolographicCard>
            
            <HolographicCard className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-emerald-500 h-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">Leveraging cutting-edge technologies to create forward-thinking digital experiences.</p>
              </motion.div>
            </HolographicCard>
          </div>
        </motion.section>
      </motion.div>

      {/* Advanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <motion.div 
            className="w-6 h-10 border-2 border-amber-500 rounded-full flex justify-center p-1"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1 h-2 bg-amber-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-medium {
          animation: pulse-medium 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .triangle-shape {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </main>
  );
};

export default Hero;