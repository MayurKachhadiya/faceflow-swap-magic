
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
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
      
      <div className="pt-16 flex w-full relative">
        <NavigationSidebar
          navigationItems={navigationItems}
          activeSection={activeSection}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
          scrollToSection={scrollToSection}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
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
