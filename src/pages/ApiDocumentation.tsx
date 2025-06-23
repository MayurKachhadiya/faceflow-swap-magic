
import React, { useState, useEffect } from 'react';
import { Code, Book, Key, AlertCircle, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { NavigationSidebar } from '@/components/documentation/NavigationSidebar';
import { IntroductionSection } from '@/components/documentation/sections/IntroductionSection';
import { AuthenticationSection } from '@/components/documentation/sections/AuthenticationSection';
import { SingleFaceSwapSection } from '@/components/documentation/sections/SingleFaceSwapSection';
import { MultipleFaceSwapSection } from '@/components/documentation/sections/MultipleFaceSwapSection';
import { ErrorHandlingSection } from '@/components/documentation/sections/ErrorHandlingSection';
import { ContactSection } from '@/components/documentation/sections/ContactSection';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'authentication', title: 'Authentication', icon: Key },
    { id: 'single-face-swap', title: 'Single Face Swap API', icon: Code },
    { id: 'multiple-face-swap', title: 'Multiple Face Swap API', icon: Code },
    { id: 'error-handling', title: 'Error Handling', icon: AlertCircle },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      
      // Get all section elements and their positions
      const sectionPositions = sections.map(sectionId => {
        const element = document.getElementById(sectionId);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        return {
          id: sectionId,
          top: elementTop,
          bottom: elementBottom,
          height: rect.height
        };
      }).filter(Boolean);

      // Find which section is currently most visible
      let currentSection = 'introduction';
      
      // Check if we're near the bottom of the page - if so, highlight the last section
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      if (isNearBottom) {
        currentSection = sections[sections.length - 1]; // Last section (contact)
      } else {
        // Find the section that contains the current scroll position
        for (const section of sectionPositions) {
          if (scrollPosition >= section.top && scrollPosition < section.bottom) {
            currentSection = section.id;
            break;
          }
          // If we're between sections, use the one we just passed
          if (scrollPosition >= section.top) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const targetPosition = element.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="flex w-full">
        <NavigationSidebar
          navigationItems={navigationItems}
          activeSection={activeSection}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          scrollToSection={scrollToSection}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 lg:pl-64">
          <div className="max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <IntroductionSection />
            <AuthenticationSection />
            <SingleFaceSwapSection />
            <MultipleFaceSwapSection />
            <ErrorHandlingSection />
            <ContactSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocumentation;
