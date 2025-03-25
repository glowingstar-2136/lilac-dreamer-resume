
import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';

const Index: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const spotlight = document.createElement('div');
      spotlight.classList.add('spotlight');
      document.body.appendChild(spotlight);
      
      setTimeout(() => {
        spotlight.classList.add('active');
      }, 10);
      
      setTimeout(() => {
        spotlight.remove();
      }, 2000);
    };
    
    // Add mouse move spotlight effect with a throttled listener
    let timeout: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleMouseMove(e);
      }, 100);
    };
    
    window.addEventListener('mousemove', throttledMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);
  
  return (
    <div className="bg-dark min-h-screen overflow-x-hidden scrollbar-thin">
      {/* Background particles */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Education Section */}
      <EducationSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Yuvashree | Interactive 3D Resume</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
