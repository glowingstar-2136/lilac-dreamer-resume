
import React, { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';
import { GraduationCap } from 'lucide-react';

const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="education"
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4 font-display">Education Journey</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My academic foundation that's shaping my skills and knowledge.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Current University */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <AnimatedCard className="mb-10 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-lilac/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-lilac" />
                  </div>
                </div>
                <div className="flex-grow text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-lilac-light">
                      Computer Science & Engineering
                    </h3>
                    <span className="text-sm bg-lilac/20 text-lilac-light px-3 py-1 rounded-full mt-2 md:mt-0">
                      2023 - Present
                    </span>
                  </div>
                  <h4 className="text-lg text-white mb-3">University Name</h4>
                  <p className="text-gray-300">
                    Currently in my first year of studies, focusing on building a strong foundation in programming, algorithms, and software engineering principles.
                  </p>
                  <div className="mt-4">
                    <h5 className="text-lilac font-medium mb-2">Key Courses:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Introduction to Programming
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Data Structures
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Computer Architecture
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Web Development Fundamentals
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* High School */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <AnimatedCard className="mb-10 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-lilac/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-lilac" />
                  </div>
                </div>
                <div className="flex-grow text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-lilac-light">
                      High School Diploma
                    </h3>
                    <span className="text-sm bg-lilac/20 text-lilac-light px-3 py-1 rounded-full mt-2 md:mt-0">
                      2019 - 2023
                    </span>
                  </div>
                  <h4 className="text-lg text-white mb-3">High School Name</h4>
                  <p className="text-gray-300">
                    Graduated with honors, focusing on mathematics, physics, and computer science. Participated in various STEM competitions and coding challenges.
                  </p>
                  <div className="mt-4">
                    <h5 className="text-lilac font-medium mb-2">Achievements:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        GPA: 3.9/4.0
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Computer Science Club President
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Regional Coding Competition Finalist
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Mathematics Honor Society
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Online Courses */}
          <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <AnimatedCard className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-lilac/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-lilac" />
                  </div>
                </div>
                <div className="flex-grow text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-lilac-light">
                      Additional Learning
                    </h3>
                    <span className="text-sm bg-lilac/20 text-lilac-light px-3 py-1 rounded-full mt-2 md:mt-0">
                      Ongoing
                    </span>
                  </div>
                  <h4 className="text-lg text-white mb-3">Online Platforms & Self Study</h4>
                  <p className="text-gray-300">
                    Continuously expanding my knowledge through online courses, coding challenges, and personal projects.
                  </p>
                  <div className="mt-4">
                    <h5 className="text-lilac font-medium mb-2">Key Learning:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Web Development (HTML, CSS, JS)
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        React Fundamentals
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        Python Programming
                      </li>
                      <li className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-lilac rounded-full mr-2"></span>
                        UI/UX Design Principles
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
