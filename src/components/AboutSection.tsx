
import React, { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const AboutSection: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 flex items-center relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left side - 3D photo */}
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <AnimatedCard className="p-4 aspect-square max-w-md mx-auto">
              <div className="bg-gradient-to-br from-lilac/30 to-lilac-dark/20 w-full h-full rounded-lg flex items-center justify-center">
                <div className="relative w-4/5 h-4/5">
                  <img 
                    src="/MEH.jpeg"  
                    alt="Yuvashree's Photo" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl z-10"
                  />
                  <div className="absolute inset-0 border-2 border-lilac rounded-lg transform translate-x-3 translate-y-3"></div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Right side - About me content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-display">About Me</h2>
              <div className="w-20 h-1 bg-lilac"></div>
            </div>

            <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-gray-300 text-lg leading-relaxed mb-4 text-left">
                As a first-year student with a passion for technology and innovation, I'm at the beginning of an exciting journey in the world of development.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4 text-left">
                I'm driven by curiosity and a desire to create meaningful digital experiences. My academic path is just beginning, but I bring enthusiasm, creativity, and a fresh perspective to every project I undertake.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed text-left">
                When I'm not studying or coding, you'll find me exploring new technologies, participating in hackathons, and collaborating with peers on creative projects.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-semibold text-lilac-light mb-3 text-left">Personal Info</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <span className="text-lilac font-semibold w-24">Name:</span>
                  <span className="text-gray-300">Yuvashree</span>
                </li>
                <li className="flex items-center">
                  <span className="text-lilac font-semibold w-24">Age:</span>
                  <span className="text-gray-300">19</span>
                </li>
                <li className="flex items-center">
                  <span className="text-lilac font-semibold w-24">Email:</span>
                  <span className="text-gray-300">yuvashreecv@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <span className="text-lilac font-semibold w-24">Location:</span>
                  <span className="text-gray-300">Chennai, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
