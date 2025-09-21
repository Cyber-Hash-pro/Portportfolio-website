import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa';
import GitHubCalendar from "react-github-calendar";
import Footer from '../components/Footer';


const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      github: "#",
      live: "#",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time collaborative task management application with drag-and-drop functionality and team collaboration features.",
      technologies: ["React", "Socket.io", "PostgreSQL", "Redux", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1139&q=80",
      github: "#",
      live: "#",
      category: "frontend"
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Generative AI powered chat application with OpenAI integration, message history, and customizable AI personalities.",
      technologies: ["React", "OpenAI API", "Firebase", "Tailwind", "Node.js"],
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      github: "#",
      live: "#",
      category: "ai"
    },
    {
      id: 4,
      title: "Fitness Tracker",
      description: "Comprehensive fitness tracking application with workout plans, progress analytics, and social features.",
      technologies: ["React Native", "GraphQL", "MongoDB", "Express", "JWT"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      github: "#",
      live: "#",
      category: "mobile"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website with smooth animations, dark mode, and project showcase.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
      github: "#",
      live: "#",
      category: "frontend"
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Real-time weather forecasting application with location-based services and interactive maps.",
      technologies: ["React", "OpenWeather API", "Leaflet", "Chart.js", "Geolocation API"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80",
      github: "#",
      live: "#",
      category: "frontend"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, scale: 1.02, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, 
            AI integration, and modern web technologies.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              className="bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-600/80 text-xs rounded-md backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/80 text-xs rounded-md backdrop-blur-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <a 
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                      aria-label="View code on GitHub"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                    <a 
                      href={project.live}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                      aria-label="View live demo"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  </div>
                  <button 
                    className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    <FaEye className="text-xs" />
                    View details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="bg-gray-800/90 backdrop-blur-lg rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button 
                  className="absolute top-4 right-4 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a 
                    href={selectedProject.github}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </a>
                  <a 
                    href={selectedProject.live}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* GitHub Contribution Graph */}
<motion.div 
  className="mt-20 text-center"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
>
  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
   My GitHub Contributions
  </h2>
  <p className="text-gray-400 mb-8">Here’s my GitHub activity over the past year.</p>
  
  <div className="flex justify-center">
    <GitHubCalendar 
      username="Cyber-Rebel" 
      blockSize={15}
      blockMargin={5}
      color="#06b6d4"
      fontSize={14}
    />
  </div>
</motion.div>


<div className='mt-20'>
<Footer />
</div>

    </div>

   
);
}
export default Projects;