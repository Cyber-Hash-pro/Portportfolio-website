// ============================================
// EXPERIENCE SECTION COMPONENT
// ============================================
// Displays work experience and education in a
// beautiful timeline layout with alternating cards

import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/data';

// Timeline item component
const TimelineItem = ({ item, index, isLast }) => {
    // Alternate sides on desktop (even = left, odd = right)
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-center justify-center lg:justify-${isEven ? 'end' : 'start'} w-full mb-8 lg:mb-0`}
        >
            {/* Desktop Layout - Alternating */}
            <div className={`hidden lg:flex w-full items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content Card */}
                <div className="w-5/12">
                    <TimelineCard item={item} />
                </div>

                {/* Center Line with Dot */}
                <div className="w-2/12 flex flex-col items-center">
                    <div className="timeline-dot z-10" />
                    {!isLast && (
                        <div className="w-0.5 h-32 bg-gradient-to-b from-[#A9927D] to-transparent" />
                    )}
                </div>

                {/* Empty space for alternate side */}
                <div className="w-5/12" />
            </div>

            {/* Mobile Layout - Single Column */}
            <div className="lg:hidden w-full flex">
                {/* Timeline line */}
                <div className="flex flex-col items-center mr-4">
                    <div className="timeline-dot z-10 flex-shrink-0" />
                    {!isLast && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#A9927D] to-transparent min-h-[100px]" />
                    )}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-8">
                    <TimelineCard item={item} />
                </div>
            </div>
        </motion.div>
    );
};

// Timeline card content
const TimelineCard = ({ item }) => {
    const isWork = item.type === 'work';

    return (
        <div className="glass rounded-2xl p-6 card-hover card-glow group">
            {/* Header with Logo and Type Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    {/* Company/Institution Logo */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                        <img
                            src={item.logo}
                            alt={item.company}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-100 group-hover:text-[#A9927D] transition-colors">
                            {item.role}
                        </h3>
                        <p className="text-[#A9927D] font-medium">{item.company}</p>
                    </div>
                </div>

                {/* Type Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${isWork
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                    {isWork ? '💼 Work' : '🎓 Education'}
                </span>
            </div>

            {/* Duration and Location */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.duration}
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                </span>
            </div>

            {/* Description Points */}
            <ul className="space-y-2">
                {item.description.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                        <span className="text-[#A9927D] mt-1.5 flex-shrink-0">▸</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ExperienceSection = () => {
    return (
        <section id="experience" className="section-padding bg-[#0A0908] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#A9927D]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#A9927D] font-medium tracking-wider uppercase text-sm">
                        My Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 font-[font9]">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A timeline of my professional journey and educational background.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Desktop Center Line (hidden on mobile) */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#A9927D] via-[#A9927D]/50 to-transparent" />

                    {/* Timeline Items */}
                    <div className="lg:space-y-16">
                        {experienceData.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                item={item}
                                index={index}
                                isLast={index === experienceData.length - 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Download Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a
                        href="#"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Resume
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceSection;
