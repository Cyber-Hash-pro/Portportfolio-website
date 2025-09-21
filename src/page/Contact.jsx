import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Icons Component
const FloatingIcon = ({ position, icon, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Sphere 
      ref={meshRef} 
      args={[0.3, 16, 16]} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// 3D Background Scene
const ThreeDBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <FloatingIcon position={[-2, 1, 0]} icon="📧" color="#10b981" />
      <FloatingIcon position={[2, -1, 0]} icon="📱" color="#3b82f6" />
      <FloatingIcon position={[0, 2, 0]} icon="📍" color="#f59e0b" />
      <FloatingIcon position={[0, -2, 0]} icon="💼" color="#8b5cf6" />
    </Canvas>
  );
};

// Animated Input Field Component
const AnimatedInput = ({ label, type, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <motion.div 
      className="relative mb-6"
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-gray-300 mb-2 text-sm font-medium">{label}</label>
      <motion.input 
        type={type}
        className="w-full px-4 py-3 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-lg focus:outline-none transition-all duration-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderColor: focused ? '#10b981' : '#374151',
          boxShadow: focused ? '0 0 0 2px rgba(16, 185, 129, 0.2)' : 'none'
        }}
      />
      {focused && (
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// Animated Textarea Component
const AnimatedTextarea = ({ label, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <motion.div 
      className="relative mb-6"
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-gray-300 mb-2 text-sm font-medium">{label}</label>
      <motion.textarea 
        rows="5"
        className="w-full px-4 py-3 bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-lg focus:outline-none transition-all duration-300 resize-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          borderColor: focused ? '#10b981' : '#374151',
          boxShadow: focused ? '0 0 0 2px rgba(16, 185, 129, 0.2)' : 'none'
        }}
      />
      {focused && (
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// Social Media Icon Component
const SocialIcon = ({ platform, icon, url, color }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-14 h-14 bg-gray-800/50 backdrop-blur-md rounded-full flex items-center justify-center group overflow-hidden"
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Background gradient on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
      />
      
      {/* Border effect */}
      <motion.div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${color}80` }}
      />
      
      {/* Icon */}
      <span className="text-xl z-10 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {platform}
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };
  
  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'nilesh.patil@example.com',
      color: '#10b981'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 98765 43210',
      color: '#3b82f6'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Mumbai, India',
      color: '#f59e0b'
    }
  ];
  
  const socialLinks = [
    {
      platform: 'LinkedIn',
      icon: '💼',
      url: '#',
      color: '#0a66c2'
    },
    {
      platform: 'GitHub',
      icon: '🐙',
      url: '#',
      color: '#333'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      url: '#',
      color: '#1da1f2'
    },
    {
      platform: 'Instagram',
      icon: '📸',
      url: '#',
      color: '#e1306c'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-60 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>
      
      {/* 3D Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <ThreeDBackground />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Let's collaborate on your next project. I'm always excited to work on 
            innovative solutions and bring ideas to life.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-5 p-4 bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800 hover:border-emerald-500/30 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: `${item.color}20` }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index}
                    platform={social.platform}
                    icon={social.icon}
                    url={social.url}
                    color={social.color}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Send Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-2">
              <AnimatedInput 
                label="Full Name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              
              <AnimatedInput 
                label="Email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              
              <AnimatedInput 
                label="Subject"
                type="text"
                name="subject"
                placeholder="Project Discussion"
                value={formData.subject}
                onChange={handleChange}
              />
              
              <AnimatedTextarea 
                label="Message"
                placeholder="Tell me about your project..."
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              
              <motion.button 
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg font-medium text-white relative overflow-hidden group"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span 
                        className="ml-2"
                        initial={{ x: 0 }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ↗
                      </motion.span>
                    </>
                  )}
                </div>
              </motion.button>
            </form>
            
            {/* Submission Status */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700/50 rounded-lg backdrop-blur-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      ✓
                    </div>
                    <p className="text-emerald-300">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
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
      `}</style>
    </div>
  );
};

export default Contact;