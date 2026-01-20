// ============================================
// HOME PAGE
// ============================================
// Main landing page integrating all sections
// with smooth scroll animations

import React from 'react';
import Hero from '../components/Hero.jsx';
import AboutSection from '../components/AboutSection.jsx';
import SkillsSection from '../components/SkillsSection.jsx';
import ProjectsSection from '../components/ProjectsSection.jsx';
import ExperienceSection from '../components/ExperienceSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#0A0908] text-white flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Divider */}
      <div className="section-divider max-w-4xl mx-auto w-full" />

      {/* About Me Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Divider */}
      <div className="section-divider max-w-4xl mx-auto w-full" />

      {/* Experience & Education Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
