import { FaPinterest, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { icon: <FaPinterest />, color: "hover:text-red-500", name: "Pinterest" },
    { icon: <FaTwitter />, color: "hover:text-blue-400", name: "Twitter" },
    { icon: <FaLinkedin />, color: "hover:text-blue-600", name: "LinkedIn" },
    { icon: <FaInstagram />, color: "hover:text-pink-500", name: "Instagram" },
    { icon: <FaYoutube />, color: "hover:text-red-600", name: "YouTube" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Section */}
          <motion.div 
            className="space-y-6 text-center md:text-left"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-3 justify-center md:justify-start"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-4 h-4 rounded-full bg-green-500 inline-block animate-pulse"></span>
              <h2 className="font-bold text-2xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                I'm Available to Work
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-xl mb-2">Find me online.</h3>
              <p className="text-gray-400">
                Thoughts, Tips, and General Life Updates.
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-5 justify-center md:justify-start text-2xl"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`text-gray-400 transition-colors ${social.color} relative group`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            className="mt-6 md:mt-0"
            variants={itemVariants}
          >
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium flex items-center gap-2 group hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-sm" />
              <span>Get in touch</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center mt-16 pt-8 border-t border-gray-800/50 text-sm text-gray-400 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1 mb-2">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>
            <span>by Cyber Rebel</span>
          </div>
          <p>© {new Date().getFullYear()} Cyber Rebel. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}