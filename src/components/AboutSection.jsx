// ============================================
// ABOUT SECTION COMPONENT
// ============================================
// Displays profile info with glassmorphism card,
// bio text, and animated stats counter

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutData } from '../data/data';

// Animated counter component for stats
const AnimatedCounter = ({ target, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        // Extract numeric value from target (e.g., "25+" -> 25)
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = numericTarget / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                setCount(numericTarget);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target]);

    // Get the suffix (like "+")
    const suffix = target.replace(/[0-9]/g, '');

    return (
        <div ref={ref} className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text">
                {count}{suffix}
            </div>
            <div className="text-sm md:text-base text-gray-400 mt-1">
                {label}
            </div>
        </div>
    );
};

const AboutSection = () => {
    // Animation variants for staggered entry
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="about" className="section-padding bg-[var(--color-bg-primary)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-medium tracking-wider uppercase text-sm">
                        Get to know me
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 font-[font9]">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Profile Image with Glassmorphism Frame */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Decorative gradient ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#A9927D]/30 to-transparent blur-2xl" />
                        </div>

                        {/* Image container with glass effect */}
                        <div className="relative glass rounded-2xl p-3 max-w-xs md:max-w-sm">
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={aboutData.image}
                                    alt="Profile"
                                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 glass-strong px-4 py-2 rounded-full"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="text-[var(--color-accent)] font-semibold">Available for hire ✨</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bio Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <p className="text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed">
                            {aboutData.bio}
                        </p>

                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                            When I'm not coding, you'll find me exploring new technologies,
                            contributing to open-source projects, or sharing knowledge with
                            the developer community. I believe in writing clean, maintainable
                            code and building applications that make a real difference.
                        </p>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="glass px-4 py-2 rounded-lg">
                                <span className="text-gray-400">📍</span>
                                <span className="ml-2 text-gray-200">Based in India</span>
                            </div>
                            <div className="glass px-4 py-2 rounded-lg">
                                <span className="text-gray-400">💼</span>
                                <span className="ml-2 text-gray-200">Open to opportunities</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <a
                                href="#contact"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Let's Connect
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 lg:mt-24"
                >
                    {aboutData.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl p-6 card-hover text-center"
                        >
                            <AnimatedCounter target={stat.value} label={stat.label} />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AboutSection;
