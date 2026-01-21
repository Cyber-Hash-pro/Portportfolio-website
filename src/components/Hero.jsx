// ============================================
// HERO SECTION COMPONENT
// ============================================
// Main landing section with 3D model,
// gradient text, CTA buttons, and tech marquee

import React, { useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { personalInfo, techStack } from "../data/data";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <main className="w-full min-h-screen font-[font9] flex flex-col items-center px-4 md:px-6 text-center relative overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl p-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl pt-8 md:pt-16">
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-strong px-4 py-2 rounded-full mb-6 border border-[var(--color-accent)]/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-gray-300">Available for opportunities</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <span className="text-gray-100">Hello, I'm </span>
          <span className="gradient-text">{personalInfo.name}</span>
          <motion.span
            className="inline-block ml-2"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
          >
            👋
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-xl md:text-2xl lg:text-3xl text-[var(--color-text-secondary)] mt-4 md:mt-6 font-light"
        >
          {personalInfo.title} • <span className="text-[var(--color-accent)] font-medium">{personalInfo.tagline}</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-10"
        >
          <a
            href="#contact"
            className="btn-primary text-base md:text-lg px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#projects"
            className="btn-outline text-base md:text-lg px-8 py-3 inline-flex items-center justify-center gap-2"
          >
            View Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex justify-center gap-4 mt-8"
        >
          {/* GitHub */}
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#A9927D]/20 transition-colors group"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[#A9927D]/20 transition-colors group"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href={personalInfo.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-[var(--color-accent)]/20 transition-colors group"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* 3D Model (Spline) */}
      <div className="relative w-full flex justify-center items-center mt-8 md:mt-12 min-h-[300px] md:min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10">
            <div className="w-10 h-10 border-4 border-t-[#A9927D] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Spline
          onError={() => {
            setLoading(false);
            console.log("Spline failed to load");
          }}
          onLoad={() => setLoading(false)}
          scene="https://prod.spline.design/SGNca2ikt67k048p/scene.splinecode"
          style={{ width: "100%", height: "400px" }}
        />
      </div>

      {/* Tech Stack Marquee */}
      <section className="py-12 md:py-20 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full relative h-12 marquee-container"
        >
          <div className="marquee text-[var(--color-text-primary)] flex gap-10 font-semibold text-sm md:text-lg">
            {/* First group */}
            <div className="texts flex items-center justify-center gap-6 md:gap-10">
              {techStack.concat(techStack).map((tech, idx) => (
                <span key={`a-${idx}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  {tech.logo && (
                    <img src={tech.logo} alt={tech.name} className="h-5 md:h-6" loading="lazy" />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
            {/* Second group for seamless loop */}
            <div className="texts flex px-10 md:px-20 items-center justify-center gap-6 md:gap-10">
              {techStack.concat(techStack).map((tech, idx) => (
                <span key={`b-${idx}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  {tech.logo && (
                    <img src={tech.logo} alt={tech.name} className="h-5 md:h-6" loading="lazy" />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Hero;
