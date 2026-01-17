import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Github, FileText } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">Software</span>
            <br />
            <span className="text-foreground">Engineer</span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Crafting digital experiences with cutting-edge technology and innovative design
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <a href="https://www.linkedin.com/in/jayavardhan-perala" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors duration-300 glow-primary hover:scale-110 transform">
            <Linkedin className="w-6 h-6 text-foreground" />
          </a>
          <a href="https://github.com/Jayavardhan-7" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors duration-300 glow-primary hover:scale-110 transform">
            <Github className="w-6 h-6 text-foreground" />
          </a>
          <a href="https://drive.google.com/file/d/18jymlApD-cP28dzSsTU9sZ4UbuQYqzk3/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors duration-300 glow-primary hover:scale-110 transform">
            <FileText className="w-6 h-6 text-foreground" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-muted-foreground"
        >
          <span className="text-sm mb-2 tracking-wide">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;