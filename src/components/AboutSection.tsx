import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Globe, Server, Brain, Cloud, Layers } from 'lucide-react';
import { Tilt } from 'react-tilt';

const skills = [
  { icon: Code2, name: "Programming Languages", description: "Python, Java, C" },
  { icon: Globe, name: "Frontend Development", description: "React, HTML5, CSS3" },
  { icon: Server, name: "Backend Development", description: "Django, Node.js, REST APIs" },
  { icon: Brain, name: "Machine Learning", description: "Deep Learning, NLP, PyTorch" },
  { icon: Database, name: "Database Management", description: "SQL, PostgreSQL, MongoDB" },
  { icon: Cloud, name: "Cloud & DevOps", description: "AWS, Docker, Git" }
];

const AboutSection = () => {
  const ref = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 hero-background opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-medium/30 to-navy-deep/70" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              About <span className="gradient-text">Me</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                I am a passionate Software Developer and AI enthusiast dedicated to building intelligent, scalable systems. With a strong foundation in Full Stack Development and Machine Learning, I bridge the gap between complex algorithms and intuitive user experiences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                My expertise spans the entire development lifecycle—from architecting robust backends and designing dynamic frontends to deploying cutting-edge AI models. I thrive on solving real-world challenges with clean, efficient, and impactful code.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pl-4 border-l-4 border-secondary/80 italic text-foreground/90 font-medium my-8"
              >
                "Technology is best when it brings people together and solves problems that matter."
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <Tilt options={{ max: 25, scale: 1, speed: 1000, glare: true, 'max-glare': 0.5 }} className="h-full">
                <a href="https://www.linkedin.com/in/jayavardhan-perala" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold transition-transform duration-300 glow-secondary inline-block hover:translate-x-1">
                  Let's Connect
                </a>
              </Tilt>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              Technical <span className="gradient-text">Expertise</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={skillsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Tilt options={{ max: 25, scale: 1.05, speed: 1000, glare: true, 'max-glare': 0.5 }} className="h-full">
                    <div className="p-6 bg-gradient-card rounded-xl neon-border hover:shadow-glow-primary transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                          <skill.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{skill.name}</h4>
                          <p className="text-muted-foreground text-xs">{skill.description}</p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;