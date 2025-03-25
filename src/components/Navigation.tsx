
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide navigation based on scroll position
      setIsScrolled(window.scrollY > 100);
      
      // Determine active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));
      
      const currentSection = sectionElements.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-1/2 transform -translate-x-1/2 z-50 py-3 px-2 rounded-full transition-all duration-500 ease-in-out',
        isScrolled ? 'mt-4 glass' : 'mt-8'
      )}
    >
      <ul className="flex space-x-1 sm:space-x-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'px-3 py-2 text-sm rounded-full transition-all duration-300',
                activeSection === section.id
                  ? 'text-white bg-lilac'
                  : 'text-gray-300 hover:text-white hover:bg-dark-lighter'
              )}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
