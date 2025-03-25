
import React, { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';

interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'design' | 'soft';
}

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'programming' | 'design' | 'soft'>('all');

  const skills: Skill[] = [
    { name: 'HTML & CSS', level: 75, category: 'programming' },
    { name: 'JavaScript', level: 70, category: 'programming' },
    { name: 'React', level: 65, category: 'programming' },
    { name: 'Python', level: 60, category: 'programming' },
    { name: 'Java', level: 50, category: 'programming' },
    { name: 'UI Design', level: 65, category: 'design' },
    { name: 'Responsive Design', level: 70, category: 'design' },
    { name: 'Wireframing', level: 60, category: 'design' },
    { name: 'Figma', level: 55, category: 'design' },
    { name: 'Problem Solving', level: 80, category: 'soft' },
    { name: 'Communication', level: 85, category: 'soft' },
    { name: 'Teamwork', level: 90, category: 'soft' },
    { name: 'Time Management', level: 75, category: 'soft' },
  ];

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  useEffect(() => {
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
        threshold: 0.2,
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
      id="skills"
      ref={sectionRef}
      className="py-20 relative"
    >
      {/* Background decorator */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-lilac/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-lilac/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-display">Skills & Expertise</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical abilities and personal strengths that I bring to every project.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Tabs for filtering skills */}
          <div className="flex justify-center mb-10">
            <div className="p-1 bg-dark-lighter rounded-lg inline-flex">
              {[
                { id: 'all', label: 'All Skills' },
                { id: 'programming', label: 'Programming' },
                { id: 'design', label: 'Design' },
                { id: 'soft', label: 'Soft Skills' },
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
          
          {/* Skills List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <AnimatedCard className="p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                      <span className="text-sm text-lilac-light">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-lilac to-lilac-light rounded-full transition-all duration-1000"
                        style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skill highlights */}
        <div className={`mt-16 max-w-4xl mx-auto transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <AnimatedCard className="p-8">
            <h3 className="text-xl font-bold text-lilac-light mb-6 text-center">Learning Journey Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-lilac/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-lilac">5+</span>
                </div>
                <h4 className="text-white font-medium mb-2">Programming Languages</h4>
                <p className="text-gray-400 text-sm">Exploring various languages to build a versatile skill set</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-lilac/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-lilac">10+</span>
                </div>
                <h4 className="text-white font-medium mb-2">Projects Completed</h4>
                <p className="text-gray-400 text-sm">Personal and academic projects demonstrating practical skills</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-lilac/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-lilac">3+</span>
                </div>
                <h4 className="text-white font-medium mb-2">Online Certifications</h4>
                <p className="text-gray-400 text-sm">Continuous learning through specialized courses</p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
