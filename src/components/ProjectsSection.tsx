import React, { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'other';
  image?: string;
}

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Setting this to true by default to ensure initial visibility
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile' | 'other'>('all');
  
  const projects: Project[] = [
    {
      title: 'Interactive 3D Resume',
      description: 'A responsive portfolio website with animations, particle effects, and interactive sections to showcase my skills and projects.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Animation'],
      category: 'web',
    },
    {
      title: 'Student Resource Hub',
      description: 'A collaborative platform for students to share study resources and materials.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      category: 'web',
    },
  ];
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  useEffect(() => {
    // Still keep the observer for scrolling animations, but start with visible content
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Lower threshold to trigger earlier
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 relative"
    >
      {/* Background decorator */}
      <div className="absolute left-0 top-1/3 w-72 h-72 bg-lilac/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-display">My Projects</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These are the projects I'm currently working on as I begin my journey in tech.
          </p>
        </div>
        
        <div className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Tabs for filtering projects */}
          <div className="flex justify-center mb-10">
            <div className="p-1 bg-dark-lighter rounded-lg inline-flex">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'web', label: 'Web' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'other', label: 'Other' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-lilac text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div 
                  key={project.title}
                  className="opacity-100 translate-y-0"
                >
                  <AnimatedCard className="h-full">
                    <div className="flex flex-col h-full">
                      {/* Project Image/Placeholder */}
                      <div className="bg-dark-lighter h-48 rounded-t-xl flex items-center justify-center overflow-hidden">
                        <div className="text-sm text-gray-400">Project Preview</div>
                      </div>
                      
                      {/* Project Info */}
                      <div className="p-6 flex-grow flex flex-col text-left">
                        <h3 className="text-xl font-bold text-lilac-light mb-2">{project.title}</h3>
                        <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                        
                        <div className="mt-auto">
                          <h4 className="text-sm font-medium text-white mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span 
                                key={tech} 
                                className="text-xs px-2 py-1 bg-lilac/20 text-lilac-light rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-400">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Update call to action for someone just starting out */}
        <div className={`mt-16 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-300 mb-6">
            I'm just beginning my development journey and excited to work on more projects soon!
          </p>
          <button className="px-6 py-3 bg-lilac hover:bg-lilac-dark text-white font-medium rounded-full transition-all duration-300">
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
