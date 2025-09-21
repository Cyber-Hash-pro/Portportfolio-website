import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaClock, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import Footer from '../components/Footer';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Building Modern React Applications",
      excerpt: "Learn how to build scalable React applications with modern tools and best practices. This guide covers everything from component architecture to state management and performance optimization.",
      content: "In this comprehensive guide, we'll explore the latest patterns and practices for building modern React applications. We'll cover hooks, context API, state management solutions, and performance optimization techniques that will take your React skills to the next level.",
      date: "September 1, 2025",
      readTime: "5 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Mastering Full Stack Development",
      excerpt: "A comprehensive guide to becoming a full-stack developer in 2025. Learn the essential skills and technologies needed to build complete web applications.",
      content: "Full-stack development requires a diverse skill set that spans both frontend and backend technologies. In this article, we'll explore the modern full-stack toolkit, including React, Node.js, databases, deployment strategies, and DevOps practices.",
      date: "August 28, 2025",
      readTime: "8 min read",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80"
    },
    {
      id: 3,
      title: "AI and Web Development: The Future",
      excerpt: "How artificial intelligence is transforming the way we build web applications. Explore the integration of AI tools and APIs in modern development workflows.",
      content: "Artificial intelligence is no longer a futuristic concept—it's here and transforming web development. From AI-assisted coding tools to intelligent user experiences, we'll explore how developers can leverage AI in their projects today.",
      date: "August 25, 2025",
      readTime: "6 min read",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442135135-416f8aa26a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
    },
    {
      id: 4,
      title: "Database Design Best Practices",
      excerpt: "Essential principles for designing efficient and scalable database schemas. Learn how to structure your data for performance and maintainability.",
      content: "A well-designed database is the foundation of any successful application. This article covers normalization techniques, indexing strategies, query optimization, and how to choose the right database for your specific use case.",
      date: "August 22, 2025",
      readTime: "7 min read",
      category: "Database",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1116&q=80"
    },
    {
      id: 5,
      title: "The Power of TypeScript in Modern Web Apps",
      excerpt: "Discover how TypeScript enhances JavaScript development with type safety and better tooling for large-scale applications.",
      content: "TypeScript has revolutionized how we write JavaScript by adding static typing and advanced tooling. In this article, we'll explore TypeScript's key features, best practices, and how it improves developer productivity and code quality.",
      date: "August 18, 2025",
      readTime: "6 min read",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "Progressive Web Apps: The Complete Guide",
      excerpt: "Learn how to build PWAs that deliver native app-like experiences with offline functionality, push notifications, and more.",
      content: "Progressive Web Apps combine the best of web and mobile applications. This guide covers service workers, web app manifests, caching strategies, and how to make your web app installable and reliable even in poor network conditions.",
      date: "August 15, 2025",
      readTime: "9 min read",
      category: "PWA",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'React', name: 'React' },
    { id: 'Full Stack', name: 'Full Stack' },
    { id: 'AI', name: 'AI/ML' },
    { id: 'Database', name: 'Database' },
    { id: 'TypeScript', name: 'TypeScript' },
    { id: 'PWA', name: 'PWA' }
  ];

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const blogVariants = {
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
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            My Blogs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sharing knowledge and insights about web development, programming, 
            and the latest technologies in the industry.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Blogs grid */}
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
          {filteredBlogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={blogVariants}
              whileHover="hover"
              className="bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 cursor-pointer group"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-600/90 text-sm rounded-full backdrop-blur-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-xs" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-xs" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Read article</span>
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1">
                    <span>Read More</span>
                    <FaArrowRight className="text-xs mt-0.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load more button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button className="px-8 py-3 border border-gray-600 rounded-lg hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mx-auto">
            <FaBookOpen className="text-sm" />
            <span>Load More Articles</span>
          </button>
        </motion.div>
      </div>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
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
                  src={selectedBlog.image} 
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover"
                />
                <button 
                  className="absolute top-4 right-4 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
                  onClick={() => setSelectedBlog(null)}
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-600/90 text-sm rounded-full backdrop-blur-sm">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-xs" />
                    <span>{selectedBlog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-xs" />
                    <span>{selectedBlog.readTime}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4">{selectedBlog.title}</h2>
                <p className="text-gray-300 mb-6">{selectedBlog.content}</p>
                
                <div className="flex gap-4">
                  <button className="px-5 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    Save for later
                  </button>
                  <button className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-colors flex items-center gap-2">
                    <FaBookOpen />
                    <span>Read full article</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='mt-20'>
      <Footer />
      </div>
    </div>
  );
};

export default Blogs;