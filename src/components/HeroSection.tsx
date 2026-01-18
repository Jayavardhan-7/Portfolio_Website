import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Github, FileText, ArrowRight, Mail } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "AI Enthusiast",
    "Problem Solver"
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/90" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-2xl sm:text-3xl text-electric-blue font-medium tracking-wide">
            Hi, I'm <span className="text-white">Jay</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="min-h-[80px] sm:min-h-[120px]"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            I am a <br className="sm:hidden" />
            <span className="gradient-text inline-block min-w-[280px]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Crafting digital experiences with cutting-edge technology and innovative design
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {/* Main CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-primary/50 text-foreground hover:bg-primary/10 text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all hover:scale-105"
            >
              Contact Me
              <Mail className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Social Icons Separator */}
          <div className="hidden sm:block w-px h-12 bg-white/10 mx-2"></div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/jayavardhan-perala" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-foreground transition-all hover:scale-110 hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/Jayavardhan-7" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-foreground transition-all hover:scale-110 hover:text-primary">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://drive.google.com/file/d/18jymlApD-cP28dzSsTU9sZ4UbuQYqzk3/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-foreground transition-all hover:scale-110 hover:text-primary">
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => scrollToSection('projects')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2 tracking-wide font-light">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;