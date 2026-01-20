// ============================================
// PROJECTS PAGE
// ============================================
// Full projects listing page with all projects

import React from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from '../components/ProjectsSection.jsx';
import Footer from '../components/Footer.jsx';

const Projects = () => {
  return (
    <div className="min-h-screen w-full bg-[#0A0908] text-white pt-20">
      {/* Page Header */}
      <section className="section-padding pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#A9927D] font-medium tracking-wider uppercase text-sm"
          >
            Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4 font-[font9]"
          >
            My <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            A collection of projects that showcase my skills in full-stack development,
            AI integration, and modern web technologies.
          </motion.p>
        </div>
      </section>

      {/* All Projects Grid */}
      <ProjectsSection showAll={true} />

      <Footer />
    </div>
  );
};

export default Projects;
