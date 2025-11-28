import { useState, useCallback, memo } from 'react';
import { Button } from './ui/button';
import { ArrowRight, MapPin, Building2, Users, Construction } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';
import { HERO_IMAGES } from './constants/images';

export const Hero = memo(function Hero() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  // Optimized scroll - instant scroll for better performance
  const scrollToProjects = useCallback(() => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  return (
    <>
      <section id="home" className="relative pt-16">
        {/* Mobile Layout - Image on top, content below */}
        <div className="md:hidden">
          {/* Mobile Background Image Section */}
          <div className="relative h-72 w-full">
            <div 
              className="absolute top-0 left-0 right-0 bottom-[-100px] z-0 bg-cover md:bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${HERO_IMAGES.background})`,
                backgroundPosition: window.innerWidth < 768 ? 'center 65%' : 'center'
              }}
            >
            </div>
          </div>

          {/* Mobile Content Below Image */}
          <div className="relative z-10 px-6 pt-20 pb-12 text-center text-white bg-gray-900 mt-24">
            <h1 className="text-3xl font-normal mb-4 text-white -mt-8">
              Welcome to
              <span className="block text-white">
                Urbanest Realty
              </span>
            </h1>
            <p className="text-base mb-6 text-gray-200 max-w-2xl mx-auto">
              Discover refined living with Urbanest Realty - where timeless design meets comfort, sophistication and modern luxury.
            </p>
            
            {/* Mobile Buttons */}
            <div className="flex flex-row items-center justify-center gap-3 mb-8 mt-6">
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-gray-900 font-medium w-full max-w-[160px] px-8 py-6 whitespace-nowrap border-2 border-white"
                onClick={scrollToProjects}
              >
                Explore Projects
              </Button>
              
              <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6 border-2 border-white" onClick={() => setShowEnquiry(true)}>
                Enquire Now
              </Button>
            </div>

            {/* Mobile Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12">
              <div className="flex flex-col items-center">
                <Building2 className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">3</div>
                <div className="text-xs text-gray-300 text-center">Ongoing Projects</div>
              </div>
              <div className="flex flex-col items-center">
                <Construction className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">1M sqft</div>
                <div className="text-xs text-gray-300 text-center">Under Construction</div>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">Bangalore</div>
                <div className="text-xs text-gray-300 text-center">Prime Locations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Using Mobile Styling */}
        <div className="hidden md:block">
          {/* Desktop Background Image Section */}
          <div className="relative h-96 w-full">
            <div 
              className="absolute top-[-295px] left-0 right-0 bottom-[-300px] z-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url(${HERO_IMAGES.background})`,
                backgroundPosition: 'center center'
              }}
            >
            </div>
          </div>

          {/* Desktop Content Below Image */}
          <div className="relative z-10 px-6 pt-12 pb-6 text-center text-white -mt-20 md:-mt-8 max-w-3xl md:max-w-2xl mx-auto" style={{ backgroundColor: 'rgba(16, 23, 39, 0.7)' }}>
            <h1 className="text-3xl font-normal mb-4 text-white -mt-8">
              Welcome to
              <span className="block text-white">
                Urbanest Realty
              </span>
            </h1>
            <p className="text-base mb-6 text-gray-200 max-w-2xl mx-auto">
              Discover refined living with Urbanest Realty - where timeless design meets comfort, sophistication and modern luxury.
            </p>
            
            {/* Desktop Buttons */}
            <div className="flex flex-row items-center justify-center gap-3 mb-8 mt-6">
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-gray-900 font-medium w-full max-w-[160px] px-8 py-6 whitespace-nowrap border-2 border-white"
                onClick={scrollToProjects}
              >
                Explore Projects
              </Button>
              
              <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6 border-2 border-white" onClick={() => setShowEnquiry(true)}>
                Enquire Now
              </Button>
            </div>

            {/* Desktop Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12">
              <div className="flex flex-col items-center">
                <Building2 className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">3</div>
                <div className="text-xs text-gray-300 text-center">Ongoing Projects</div>
              </div>
              <div className="flex flex-col items-center">
                <Construction className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">1M sqft</div>
                <div className="text-xs text-gray-300 text-center">Under Construction</div>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 mb-2 text-white" />
                <div className="text-lg font-bold text-white">Bangalore</div>
                <div className="text-xs text-gray-300 text-center">Prime Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showEnquiry && (
        <EnquiryForm 
          isOpen={showEnquiry}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </>
  );
});
