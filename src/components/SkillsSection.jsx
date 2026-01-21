// ============================================
// SKILLS SECTION COMPONENT
// ============================================
// Displays skills in categorized cards with
// animated progress bars and icons

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillsData } from '../data/data';

// Individual skill card with progress bar
const SkillCard = ({ skill, index, isInView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 glass rounded-xl card-hover group"
        >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-7 h-7 object-contain filter brightness-100 group-hover:brightness-110"
                    loading="lazy"
                />
            </div>

            {/* Name and Progress */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[var(--color-text-primary)] truncate">{skill.name}</span>
                    <span className="text-sm text-[var(--color-accent)] font-medium">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="skill-bar">
                    <motion.div
                        className="skill-bar-fill"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: skill.level / 100 } : {}}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

// Category section component
const SkillCategory = ({ title, skills, icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-dark rounded-2xl p-6 md:p-8"
        >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-100">{title}</h3>
            </div>

            {/* Skills Grid */}
            <div className="grid gap-3">
                {skills.map((skill, index) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const SkillsSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section id="skills" className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[var(--color-accent)] font-medium tracking-wider uppercase text-sm">
                        What I Work With
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 font-[font9]">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A comprehensive toolkit built over years of hands-on experience
                        in building modern web applications.
                    </p>
                </motion.div>

                {/* Skills Categories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <SkillCategory
                        title="Frontend"
                        skills={skillsData.frontend}
                        icon="🎨"
                    />
                    <SkillCategory
                        title="Backend"
                        skills={skillsData.backend}
                        icon="⚙️"
                    />
                    <SkillCategory
                        title="Tools & Others"
                        skills={skillsData.tools}
                        icon="🛠️"
                    />
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        ...and always learning new technologies! 🚀
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SkillsSection;
