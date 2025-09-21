import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";

// =====================
// Particle Background
// =====================
function AdvancedParticleBackground() {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(8000), { radius: 1.8 })
  );
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // Smooth mouse movement
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        mouse.current.x * 0.2,
        0.05
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        mouse.current.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffa500"
          size={0.006}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// =====================
// TechStackMarquee
// =====================
const TechStackMarquee = () => {
  const [activeTech, setActiveTech] = useState(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const techStack = [
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg", color: "#61DAFB", proficiency: 90 },
    { name: "Redux", logo: "https://cdn.worldvectorlogo.com/logos/redux.svg", color: "#764ABC", proficiency: 85 },
    { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg", color: "#47A248", proficiency: 80 },
    { name: "Vector DB", logo: "https://www.svgrepo.com/show/499816/database.svg", color: "#336791", proficiency: 75 },
    { name: "GitHub", logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", color: "#181717", proficiency: 95 },
    { name: "Linux", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/UbuntuCoF.svg", color: "#FCC624", proficiency: 85 },
    { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg", color: "#3178C6", proficiency: 88 },
    { name: "Gen AI", logo: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png", color: "#FF6B6B", proficiency: 82 },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", color: "#339933", proficiency: 87 },
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg", color: "#000000", proficiency: 83 },
    { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg", color: "#06B6D4", proficiency: 90 },
    { name: "Three.js", logo: "https://cdn.worldvectorlogo.com/logos/threejs-1.svg", color: "#000000", proficiency: 78 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AdvancedParticleBackground />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technologies I Work With
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tools and technologies that help me bring ideas to life and solve complex problems
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          ref={containerRef}
          className="relative overflow-hidden py-6 min-h-[80px]"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="flex w-max">
            {[0, 1].map((duplicate) => (
              <motion.div
                key={duplicate}
                className="flex flex-none whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                    delay: duplicate * 15,
                  },
                }}
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="mx-3 flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-gray-800/40 backdrop-blur-md border border-gray-700/30 hover:border-amber-500/40 transition-all duration-300 cursor-pointer group"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.05 }}
                    onHoverStart={() => setActiveTech(tech)}
                    onHoverEnd={() => setActiveTech(null)}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg p-2 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${tech.color}15` }}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-6 h-6 object-contain filter brightness-0 invert opacity-90"
                      />
                    </div>
                    <span className="text-white font-medium text-sm whitespace-nowrap">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech detail panel */}
        <AnimatePresence>
          {activeTech && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur-md rounded-xl p-5 border border-amber-500/30 shadow-xl max-w-md w-full mx-4 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg p-2"
                  style={{ backgroundColor: `${activeTech.color}20` }}
                >
                  <img
                    src={activeTech.logo}
                    alt={activeTech.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{activeTech.name}</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${activeTech.proficiency}%`,
                          backgroundColor: activeTech.color,
                        }}
                      ></div>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {activeTech.proficiency}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStackMarquee;
