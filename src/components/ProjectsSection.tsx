import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Tilt } from 'react-tilt';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "One Night Batting",
    description: "Last-minute exam preparation platform. Upload PDFs to generate relevant answers and quizzes instantly using RAG and Django.",
    tech: ["Django", "RAG System", "PDF Processing", "AI Quiz"],
    image: "/one-night-batting-v2.png",
    github: "https://github.com/Jayavardhan-7/one-night-batting"
  },
  {
    id: 2,
    title: "DataGenKit",
    description: "Comprehensive Python library for synthetic data generation. Get started easily: pip install datagenkit",
    tech: ["Python", "PyPI", "Data Engineering", "Synthetic Data"],
    image: "/datagenkit.png",
    live: "https://pypi.org/project/datagenkit/"
  },
  {
    id: 3,
    title: "Sentinel Sense",
    description: "Advanced movie review sentiment analysis system using Transformer models and Django for real-time feedback.",
    tech: ["Django", "Transformers", "NLP", "Python", "Deep Learning"],
    image: "/sentinel-sense.png",
    github: "https://github.com/Jayavardhan-7/sentinal_sense"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 1000,
    glare: true,
    'max-glare': 0.5,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative"
    >
      <Tilt options={tiltOptions} className="h-full">
        <div className="bg-gradient-card rounded-xl overflow-hidden neon-border transition-all duration-500 hover:shadow-glow-primary h-full flex flex-col">
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/10 backdrop-blur-sm rounded-full hover:bg-foreground/20 transition-colors"
                    aria-label="View Source Code"
                  >
                    <Github className="w-6 h-6 text-foreground" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/10 backdrop-blur-sm rounded-full hover:bg-foreground/20 transition-colors"
                    aria-label="View Live Project"
                  >
                    <ExternalLink className="w-6 h-6 text-foreground" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 hero-background opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/80" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the intersection of technology and creativity through innovative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;