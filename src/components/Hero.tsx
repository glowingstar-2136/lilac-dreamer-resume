
import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = e.clientX / width - 0.5;
      const y = e.clientY / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded after a short delay for entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  
  // Update 3D transform effect
  useEffect(() => {
    if (!titleRef.current) return;
    
    const xTransform = mousePosition.x * 20;
    const yTransform = mousePosition.y * 20;
    
    titleRef.current.style.transform = `translate3d(${xTransform}px, ${yTransform}px, 0) rotateX(${-yTransform/2}deg) rotateY(${xTransform/2}deg)`;
  }, [mousePosition]);
  
  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-lilac/20 to-lilac-light/10 blur-3xl top-1/3 -left-48 animate-float"
          style={{ 
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0)`,
            animationDelay: "0.5s"
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-lilac-dark/20 to-lilac/10 blur-3xl top-20 -right-40 animate-float"
          style={{ 
            transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`,
            animationDelay: "0s"
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-lilac/15 to-lilac-light/5 blur-3xl bottom-20 left-1/3 animate-float"
          style={{ 
            transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0)`,
            animationDelay: "1s"
          }}
        />
      </div>
      
      {/* Hero content */}
      <div className="z-10 max-w-4xl mx-auto px-4 text-center">
        <div 
          className={`transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="text-lilac-light font-display text-xl md:text-2xl mb-4">
            First-Year Student & Aspiring Developer
          </h2>
        </div>
        
        <div 
          ref={titleRef}
          className={`transition-all duration-700 ease-out transform perspective-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transformStyle: 'preserve-3d', transitionDelay: '500ms' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-gradient text-shadow">
            Yuvashree Chandra Sekar
          </h1>
        </div>
        
        <div 
          className={`mt-8 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            Transforming ideas into engaging digital experiences through clean code and creative design.
          </p>
        </div>
        
        <div 
          className={`mt-12 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '1100ms' }}
        >
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 py-3 bg-lilac hover:bg-lilac-dark text-white font-medium rounded-full transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore My Journey</span>
            <span className="absolute inset-0 bg-gradient-to-r from-lilac-dark to-lilac opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;