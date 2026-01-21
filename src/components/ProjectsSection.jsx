// ============================================
// PROJECTS SECTION COMPONENT
// ============================================
// Displays projects in a grid with hover
// overlays, thumbnails, and tech stack tags

import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/data';

// Individual project card
const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative glass rounded-2xl overflow-hidden card-hover"
        >
            {/* Project Thumbnail */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--color-accent)] rounded-full text-xs font-semibold text-black shadow-lg">
                        ⭐ Featured
                    </div>
                )}

                {/* Action Buttons - Appear on Hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label="View GitHub"
                    >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent-light)] transition-colors"
                        aria-label="View Live Demo"
                    >
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = ({ showAll = false }) => {
    // Show only featured projects or all projects based on prop
    const displayProjects = showAll
        ? projectsData
        : projectsData.filter(p => p.featured).slice(0, 3);

    return (
        <section id="projects" className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/3 right-0 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[var(--color-accent)] font-medium tracking-wider uppercase text-sm">
                        My Work
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 font-[font9]">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A collection of projects that showcase my skills in full-stack development,
                        AI integration, and modern web technologies.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {displayProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* View All Projects Button */}
                {!showAll && projectsData.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="/projects"
                            className="btn-outline inline-flex items-center gap-2"
                        >
                            View All Projects
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;
