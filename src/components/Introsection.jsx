import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaDownload, FaCode, FaServer, FaDatabase, FaTools, FaBrain, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";







function AdvancedParticleBackground() {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 1.8 })
  );
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // Smooth mouse movement
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
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const Introsection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
 const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX - width / 2;
    const yPct = mouseY - height / 2;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const technologies = [
    { name: "JavaScript (ES6+)", icon: <FaCode className="text-yellow-400" /> },
    { name: "TypeScript", icon: <FaCode className="text-blue-500" /> },
    { name: "React", icon: <FaRocket className="text-cyan-400" /> },
    { name: "Node.js", icon: <FaServer className="text-green-500" /> },
    { name: "PostgreSQL", icon: <FaDatabase className="text-blue-400" /> },
    { name: "NestJS", icon: <FaServer className="text-red-400" /> },
    { name: "Python", icon: <FaBrain className="text-yellow-500" /> },
    { name: "TensorFlow", icon: <FaBrain className="text-orange-500" /> }
  ];

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "12", label: "Technologies Mastered" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0a0a0a] to-[#151515] text-white py-32 px-6 md:px-16 overflow-hidden">
       <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 1] }}>
                <AdvancedParticleBackground />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-300% animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Passionate developer crafting digital experiences with cutting-edge technologies
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          {/* Left Content - 3D Image Card */}
          <motion.div 
            className="flex-1"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: 1000,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="relative">
              {/* Floating elements around image */}
              <motion.div 
                className="absolute -top-6 -left-6 w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-cyan-500/20"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <FaCode className="text-cyan-400 text-xl" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-purple-500/20"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
              >
                <FaServer className="text-purple-400 text-xl" />
              </motion.div>

              {/* Main image container with 3D effect */}
              <motion.div 
                className="overflow-hidden rounded-2xl shadow-2xl border border-white/10"
                animate={{
                  y: isHovered ? -10 : 0,
                  boxShadow: isHovered 
                    ? "0 25px 50px -12px rgba(0, 255, 255, 0.25)" 
                    : "0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.4)"
                }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img
                  src="https://avatars.githubusercontent.com/u/177938478?v=4"
                  alt="Nilesh - Software Engineer"
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7 }}
                  loading="lazy"
                  style={{ transform: "translateZ(50px)" }}
                />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* Status badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-cyan-600 to-purple-600 backdrop-blur-md border border-white/10 px-5 py-2 rounded-xl shadow-lg z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{ transform: "translateZ(60px)" }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      boxShadow: ["0 0 0 0 rgba(72, 187, 120, 0.7)", "0 0 0 8px rgba(72, 187, 120, 0)", "0 0 0 0 rgba(72, 187, 120, 0)"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      times: [0, 0.5, 1]
                    }}
                  />
                  <span className="text-sm font-semibold">Available for work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="lg:w-2/3 bg-gradient-to-b from-[#222222]/80 to-[#1a1a1a]/80 rounded-2xl p-8 shadow-2xl border border-white/10 backdrop-blur-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-purple-500/50 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-500/50 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-purple-500/50 rounded-br-xl"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Bio paragraphs */}
              <motion.p 
                className="text-white/90 mb-6 leading-relaxed text-lg"
                variants={itemVariants}
              >
                Hello! I'm <span className="text-cyan-300 font-medium">Nilesh</span>, a passionate Full Stack Developer based in Mumbai, India. With a degree in Computer Science and over 4 years of professional experience, I specialize in creating innovative digital solutions that make a real impact.
              </motion.p>

              <motion.p 
                className="text-white/90 mb-6 leading-relaxed text-lg"
                variants={itemVariants}
              >
                My journey in technology has been an exciting adventure of continuous learning and growth. I thrive on turning complex challenges into elegant, user-friendly applications that exceed expectations. Currently, I'm focused on expanding my expertise in AI integration and cloud architecture while contributing to meaningful projects.
              </motion.p>

              {/* Stats grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4 mb-8"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="bg-black/30 p-4 rounded-xl border border-white/5 text-center"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Technologies section */}
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <p className="text-white/90 mb-4 font-medium text-lg">Technologies I work with:</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {technologies.map((tech, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3 group py-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span 
                        className="text-lg group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 10 }}
                      >
                        {tech.icon}
                      </motion.span>
                      <span className="text-white/80 group-hover:text-white transition-colors">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Download CV button */}
              <motion.div 
                className="mt-8 flex gap-4"
                variants={itemVariants}
              >
                <motion.a
                  href="#"
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg group shadow-lg"
                  whileHover={{ 
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <FaDownload className="mr-2" />
                  <span className="relative">Download CV</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white border border-cyan-500/30 rounded-lg group"
                  whileHover={{ 
                    y: -3,
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative" onClick={() => navigate("/contact")}>Get In Touch</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introsection;