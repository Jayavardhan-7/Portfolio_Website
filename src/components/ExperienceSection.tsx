import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, Award, TrendingUp, Calendar } from 'lucide-react';

interface Experience {
    id: number;
    role: string;
    company: string;
    duration: string;
    type: 'work' | 'achievement' | 'milestone';
    description: string;
    achievements: string[];
    icon: typeof Briefcase;
}

const experiences: Experience[] = [
    {
        id: 1,
        role: "AI Developer Intern",
        company: "VISWAM.ai",
        duration: "2025",
        type: "work",
        description: "Worked on real-world AI/ML projects as part of a hands-on hybrid internship program focused on inclusive language technology and large language model development.",
        achievements: [
            "Developed an AI chatbot from concept to deployment, integrating natural language processing and user interaction features",
            "Collaborated with a multidisciplinary team to implement core functionalities and optimize conversational responses",
            "Utilized AI/ML tools, GitLab workflows, and open-source frameworks as part of project development and lifecycle management"
        ],
        icon: Briefcase
    },
    {
        id: 2,
        role: "Winner - 1st Position",
        company: "Ideathon 2.0 (National Innovation Challenge)",
        duration: "2025",
        type: "achievement",
        description: "Secured 1st position among 50+ teams in national-level hackathon focused on AI-driven solutions for real-world problems.",
        achievements: [
            "Developed an innovative AI solution addressing critical challenges in educational technology",
            "Presented solution to a panel of industry experts and academic professionals"
        ],
        icon: Award
    },
    {
        id: 3,
        role: "Campus Ambassador",
        company: "Ashna AI",
        duration: "2025",
        type: "milestone",
        description: "Represented Ashna AI at Malla Reddy University, promoting AI learning and community engagement.",
        achievements: [
            "Organized events and workshops to increase awareness and adoption of Ashna AI resources among students",
            "Acted as a liaison between Ashna AI and the campus community to facilitate collaboration and knowledge sharing"
        ],
        icon: TrendingUp
    },
    {
        id: 4,
        role: "Machine Learning Engineer Intern",
        company: "Prodigy InfoTech",
        duration: "2024",
        type: "work",
        description: "Completed a 1-month internship focused on applying machine learning algorithms to real-world datasets.",
        achievements: [
            "Implemented house price prediction models using advanced regression techniques",
            "Applied transfer learning with MobileNet on the Food101 dataset, achieving ~92% accuracy",
            "Performed extensive feature engineering and model evaluation"
        ],
        icon: Briefcase
    }
];

const CheckpointNode = ({ experience, index }: { experience: Experience; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'work':
                return {
                    bg: 'bg-primary',
                    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.5)]',
                    border: 'border-primary',
                    text: 'text-primary'
                };
            case 'achievement':
                return {
                    bg: 'bg-secondary',
                    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]',
                    border: 'border-secondary',
                    text: 'text-secondary'
                };
            case 'milestone':
                return {
                    bg: 'bg-accent',
                    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
                    border: 'border-accent',
                    text: 'text-accent'
                };
            default:
                return {
                    bg: 'bg-primary',
                    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.5)]',
                    border: 'border-primary',
                    text: 'text-primary'
                };
        }
    };

    const colors = getTypeColor(experience.type);
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className="relative flex items-center justify-center mb-48">
            {/* Checkpoint Node */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.glow} border-4 ${colors.border} flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110`}>
                    <experience.icon className="w-8 h-8 text-white" />
                </div>

                {/* Pulse animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute inset-0 rounded-full ${colors.bg} opacity-30`}
                />
            </motion.div>

            {/* Popup Content Box */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
                animate={
                    isInView
                        ? { opacity: 1, x: 0, scale: 1 }
                        : { opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                className={`absolute ${isLeft ? 'right-1/2 mr-12' : 'left-1/2 ml-12'} w-[calc(50%-4rem)] max-w-lg hidden lg:block`}
            >
                <motion.div
                    animate={isHovered ? { scale: 1.02, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-card rounded-xl p-6 neon-border hover:shadow-glow-primary transition-all duration-500 relative group"
                >
                    {/* Connector line to checkpoint */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? '-right-12 translate-x-0' : '-left-12 translate-x-0'} w-12 h-1 ${colors.bg} ${colors.glow}`} />

                    {/* Duration Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border ${colors.border} mb-4`}>
                        <Calendar className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white">{experience.duration}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {experience.role}
                    </h3>
                    <p className={`text-lg font-semibold mb-3 ${colors.text}`}>
                        {experience.company}
                    </p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                        {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide opacity-70">
                            Key Achievements
                        </h4>
                        <ul className="space-y-2">
                            {experience.achievements.map((achievement, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ duration: 0.4, delay: index * 0.15 + 0.4 + i * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                    <span className={`${colors.text} mt-1 text-lg leading-none`}>▹</span>
                                    <span className="flex-1">{achievement}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 rounded-xl ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </motion.div>
            </motion.div>

            {/* Mobile view - stacked layout */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="lg:hidden absolute top-20 left-0 right-0 px-4"
            >
                <div className="bg-gradient-card rounded-xl p-6 neon-border hover:shadow-glow-primary transition-all duration-500">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border ${colors.border} mb-4`}>
                        <Calendar className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold text-white">{experience.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                        {experience.role}
                    </h3>
                    <p className={`text-lg font-semibold mb-3 ${colors.text}`}>
                        {experience.company}
                    </p>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {experience.description}
                    </p>

                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide opacity-70">
                            Key Achievements
                        </h4>
                        <ul className="space-y-2">
                            {experience.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className={`${colors.text} mt-1`}>▹</span>
                                    <span className="flex-1">{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ExperienceSection = () => {
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
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A journey through milestones, achievements, and continuous growth in the tech industry
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-6xl mx-auto pt-40">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-1/2 top-24 bottom-8 w-1 -translate-x-1/2 hidden lg:block">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent origin-top rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                        />
                    </div>

                    {/* Mobile Timeline Line */}
                    <div className="absolute left-8 top-24 bottom-8 w-1 lg:hidden">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent origin-top rounded-full"
                        />
                    </div>

                    {/* Experiences */}
                    <div className="relative">
                        {experiences.map((experience, index) => (
                            <CheckpointNode key={experience.id} experience={experience} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
