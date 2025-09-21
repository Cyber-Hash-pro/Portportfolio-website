import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaDownload, FaEnvelope, FaLinkedin, FaGithub, FaCode, FaServer, FaDatabase, FaPython } from "react-icons/fa";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), springConfig);

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
    { name: "JavaScript (ES6+)", icon: <FaCode className="text-amber-500" /> },
    { name: "TypeScript", icon: <FaCode className="text-blue-600" /> },
    { name: "React", icon: <FaCode className="text-cyan-600" /> },
    { name: "Node.js", icon: <FaServer className="text-green-600" /> },
    { name: "PostgreSQL", icon: <FaDatabase className="text-blue-500" /> },
    { name: "NestJS", icon: <FaServer className="text-red-600" /> },
    { name: "Python", icon: <FaPython className="text-blue-800" /> },
    { name: "TensorFlow", icon: <FaCode className="text-orange-600" /> }
  ];

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "15+", label: "Technologies" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="relative w-full bg-white text-gray-800 py-24 px-6 md:px-16 overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-blue-50/30 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-gray-100 rounded-tr-full"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Senior Software Engineer specializing in full-stack development and cloud solutions
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content - Professional Image */}
          <motion.div 
            className="flex-1 max-w-md"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
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
              {/* Main image container */}
              <motion.div 
                className="overflow-hidden rounded-lg shadow-lg border border-gray-200"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                  alt="Nilesh - Software Engineer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ transform: "translateZ(30px)" }}
                />
              </motion.div>
              
              {/* Status badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for opportunities</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Bio paragraphs */}
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Professional Profile</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    I'm <span className="text-blue-600 font-medium">Nilesh Kumar</span>, a Senior Full Stack Developer with over 4 years of experience building scalable web applications and digital solutions. I hold a Bachelor's degree in Computer Science and specialize in modern JavaScript frameworks, cloud architecture, and database design.
                  </p>
                  <p>
                My expertise spans the entire development lifecycle, from concept to deployment. I'm passionate about creating efficient, maintainable code and solving complex technical challenges while delivering exceptional user experiences.
                  </p>
                </div>
              </motion.div>

              {/* Stats grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center"
                  >
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Technologies section */}
              <motion.div 
                className="mb-8"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Core Technologies</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 py-2"
                    >
                      <span className="text-blue-600">
                        {tech.icon}
                      </span>
                      <span className="text-gray-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload />
                  <span>Download CV</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEnvelope />
                  <span>Contact Me</span>
                </motion.a>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <motion.a
                    href="#"
                    className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ y: -2 }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ y: -2 }}
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;