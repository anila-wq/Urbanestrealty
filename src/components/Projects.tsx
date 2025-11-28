import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useRef, memo, useCallback, useState } from 'react';
import { PROJECT_IMAGES } from './constants/images';
import prosperiaImage from 'figma:asset/1001b5b28cbe32a697b72730d41d41973e1da3f2.png';
import eastfieldNewImage from 'figma:asset/cda60901ac6608e0ad7887feebfcd90ea0e8fcf3.png';
import elite35NewImage from 'figma:asset/10765297fbadc1fb8ba88fe4b5534af78789f947.png';
import sereneExoticaNewImage from 'figma:asset/8122462b9b5d7e43dc35c62c9070ae47675970d0.png';
import vistaImage from 'figma:asset/5684026f9695cc12d49831fdcceef17ef52864ad.png';

const ongoingProjects = [
  {
    id: 1,
    name: 'Eastfield',
    subtitle: 'By Urbanest Realty',
    location: 'Bangalore East - Hoskote',
    description: 'Modern luxury apartments with premium amenities and excellent connectivity to major IT hubs in Bangalore.',
    image: eastfieldNewImage,
    features: ['3 BHK Premium Residences', '1744 - 1886 sq ft'],
    price: 'Starting from ₹1.39 Cr',
    propertyType: '3 BHK Premium Residences',
    area: '1744 - 1886 sq ft',
    status: 'Ongoing',
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Security']
  },
  {
    id: 2,
    name: 'Serene Exotica',
    subtitle: 'By Urbanest Realty',
    location: 'Bangalore East - Malur Town',
    description: 'Tranquil living spaces designed for families seeking peace and luxury in a well-connected neighborhood.',
    image: sereneExoticaNewImage,
    features: ['Premium Villa plots', '1500 - 5500 sq ft'],
    price: 'Starting from ₹59 Lakhs',
    propertyType: 'Premium Villa plots',
    area: '1500 - 5500 sq ft',
    status: 'Ongoing',
    amenities: ['Landscaped Gardens', 'Kids Play Area', 'Jogging Track', 'Library'],
    url: 'https://sereneexotica.in'
  }
];

const upcomingProjects = [
  {
    id: 4,
    name: 'Urban Heights',
    subtitle: 'By Urbanest Realty',
    location: 'Malur, Bangalore East',
    description: 'High-potential plots designed for long-term wealth creation',
    image: prosperiaImage,
    features: ['Villa Plots', '1200 - 2290 sqft'],
    price: 'Starting from ₹95 Lakhs',
    propertyType: 'Villa Plots',
    area: '1200 - 2290 sqft',
    status: 'Upcoming',
    amenities: ['Rooftop Pool', 'Gymnasium', 'Party Hall', 'Indoor Games']
  },
  {
    id: 5,
    name: 'Green Valley',
    subtitle: 'By Urbanest Realty',
    location: 'Malur, Bangalore East',
    description: 'Exclusive luxury row homes offering comfort, space and sophistication',
    image: vistaImage,
    features: ['Row Houses', '1800 sqft Onwards'],
    price: 'Starting from ₹1.75 Cr',
    propertyType: 'Row Houses',
    area: '1800 sqft Onwards',
    status: 'Upcoming',
    amenities: ['Solar Panels', 'Rain Water Harvesting', 'Organic Garden', 'Cycling Track']
  }
];

const completedProjects = [
  {
    id: 3,
    name: 'Elite-35',
    subtitle: 'By Urbanest Realty',
    location: 'Bangalore East - Budigere Cross',
    description: 'Premium residences featuring modern architecture and world-class facilities for contemporary living.',
    image: elite35NewImage,
    features: ['3 BHK Apartments', '1200 - 1664 sq ft'],
    price: 'Starting from ₹80 Lakhs',
    propertyType: '3 BHK Apartments',
    area: '1200 - 1664 sq ft',
    status: 'Completed',
    amenities: ['Infinity Pool', 'Spa', 'Business Center', 'Garden']
  }
];

export const Projects = memo(function Projects() {
  const [loadingProject, setLoadingProject] = useState<string | null>(null);
  
  // Refs for mobile scroll containers
  const ongoingScrollRefMobile = useRef<HTMLDivElement>(null);
  const upcomingScrollRefMobile = useRef<HTMLDivElement>(null);
  const completedScrollRefMobile = useRef<HTMLDivElement>(null);
  
  // Refs for desktop scroll containers
  const ongoingScrollRefDesktop = useRef<HTMLDivElement>(null);
  const upcomingScrollRefDesktop = useRef<HTMLDivElement>(null);
  const completedScrollRefDesktop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ongoingCarousel = ongoingScrollRefDesktop.current;
    const upcomingCarousel = upcomingScrollRefDesktop.current;

    // Only enable auto-scroll on desktop (md and up)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    const autoScrollOngoing = () => {
      if (mediaQuery.matches && ongoingCarousel) {
        const nextButton = ongoingCarousel.querySelector('[data-carousel="next"]') as HTMLButtonElement;
        if (nextButton) {
          nextButton.click();
        }
      }
    };

    const autoScrollUpcoming = () => {
      if (mediaQuery.matches && upcomingCarousel) {
        const nextButton = upcomingCarousel.querySelector('[data-carousel="next"]') as HTMLButtonElement;
        if (nextButton) {
          nextButton.click();
        }
      }
    };

    const interval1 = setInterval(autoScrollOngoing, 4000);
    const interval2 = setInterval(autoScrollUpcoming, 5000); // Different timing for variety
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  // Handle project click with loading state
  const handleProjectClick = useCallback((projectName: string, url: string) => {
    setLoadingProject(projectName);
    // Add small delay for visual feedback before navigation
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setLoadingProject(null);
    }, 100);
  }, []);

  const renderProjectCard = (project: any, isClickable: boolean = false, navigationButtons?: { prev: () => void; next: () => void }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200 flex flex-col overflow-hidden">
      <div className="relative overflow-hidden group flex-shrink-0 w-full">
        {isClickable && project.url ? (
          <div 
            onClick={() => handleProjectClick(project.name, project.url)}
            className="cursor-pointer relative w-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              className="w-full h-[150px] object-cover transition-all duration-200 group-hover:scale-105"
              loading="lazy"
            />
            {loadingProject === project.name && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            className="w-full h-[150px] object-cover transition-all duration-200"
            loading="lazy"
          />
        )}
        <Badge 
          className="absolute top-2 left-2 !bg-black !text-white hover:!bg-gray-900 z-20"
        >
          {project.status}
        </Badge>
        {/* Clickable navigation arrows for desktop carousel */}
        {navigationButtons && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigationButtons.prev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all z-10"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigationButtons.next();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all z-10"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </>
        )}
      </div>
      
      <div className="flex flex-col items-start justify-start text-left p-4 overflow-hidden">
        <CardTitle className="text-gray-900 text-base font-bold leading-tight mb-1">
          {project.name}
        </CardTitle>
        <p className="text-xs text-gray-600 mb-2">{project.subtitle}</p>
        
        <div className="flex items-center text-gray-600 mb-2 text-xs">
          <MapPin className="h-3 w-3 mr-1" />
          {project.location}
        </div>
        
        <div className="text-gray-900 font-bold text-sm mb-3">{project.price}</div>
        <p className="text-gray-700 text-xs mb-3 line-clamp-2 min-h-[32px]">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.features.map((feature: string, idx: number) => (
            <Badge key={idx} variant="outline" className="border-gray-300 text-gray-700 text-xs px-2 py-1">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );

  const renderMobileProjectCard = (project: any, isClickable: boolean = false, containerRef?: React.RefObject<HTMLDivElement>, isDesktop: boolean = false) => (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-gray-200">
      <CardHeader className="pb-2 text-center">
        <div>
          <CardTitle className="text-gray-900 text-lg font-bold">
            {project.id === 4 ? 'CODE NAME' : project.id === 5 ? 'CODE NAME' : project.name}
          </CardTitle>
          <p className="text-xs text-gray-600 text-center">{project.id === 4 ? 'PROSPERIA' : project.id === 5 ? 'VISTA' : project.subtitle}</p>
        </div>
        <CardDescription className="flex items-center justify-center text-gray-600 mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-xs">{project.location}</span>
        </CardDescription>
      </CardHeader>
      
      <div className="relative overflow-hidden group">
        {isClickable && project.url ? (
          <div 
            onClick={() => handleProjectClick(project.name, project.url)}
            className="cursor-pointer relative"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              className="w-full h-96 object-cover transition-all duration-200 group-hover:scale-105"
              loading="lazy"
            />
            {loadingProject === project.name && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            className="w-full h-96 object-cover transition-all duration-200"
            loading="lazy"
          />
        )}
        {/* Clickable scroll navigation arrows */}
        {containerRef && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const container = containerRef.current;
                if (container) {
                  container.scrollBy({ left: isDesktop ? -300 : -360, behavior: 'smooth' });
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all z-10 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const container = containerRef.current;
                if (container) {
                  container.scrollBy({ left: isDesktop ? 300 : 360, behavior: 'smooth' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all z-10 shadow-lg"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </>
        )}
      </div>
      
      <CardContent className="pt-3 pb-4 text-center">
        <p className="text-gray-700 mb-3 text-xs line-clamp-2 text-center">{project.description}</p>
        {project.status !== 'Upcoming' && <div className="text-gray-900 font-bold text-base mb-2 text-center">{project.price}</div>}
        <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
          {project.features.map((feature: string, idx: number) => (
            <Badge key={idx} variant="outline" className="border-gray-300 text-gray-700 text-xs px-2 py-0.5">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" className="pt-12 pb-0 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6 text-gray-900">OUR PROJECTS</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover our exceptional portfolio of residential developments that showcase the perfect blend of modern design, 
            luxury amenities, and strategic locations across Bangalore.
          </p>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="md:hidden space-y-8">
          {/* Ongoing Projects - Mobile */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Ongoing Projects</h3>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                Swipe <span className="text-lg">→</span>
              </span>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" ref={ongoingScrollRefMobile}>
              {ongoingProjects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-[340px] snap-start">
                  {renderMobileProjectCard(project, true, ongoingScrollRefMobile)}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Projects - Mobile */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Projects</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" ref={upcomingScrollRefMobile}>
              {upcomingProjects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-[340px] snap-start">
                  {renderMobileProjectCard(project, false, upcomingScrollRefMobile)}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Projects - Mobile */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Completed Projects</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide" ref={completedScrollRefMobile}>
              {completedProjects.map((project) => (
                <div key={project.id} className="flex-shrink-0 w-[340px] snap-start">
                  {renderMobileProjectCard(project, false, completedScrollRefMobile)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ongoing Projects - Desktop Horizontal Scroll */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Ongoing</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide overflow-hidden" ref={ongoingScrollRefDesktop} style={{ maxWidth: '280px', margin: '0 auto' }}>
                {ongoingProjects.map((project) => (
                  <div key={project.id} className="flex-shrink-0 w-[280px] snap-start">
                    {renderMobileProjectCard(project, true, ongoingScrollRefDesktop, true)}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Projects - Desktop Horizontal Scroll */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Upcoming</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide overflow-hidden" ref={upcomingScrollRefDesktop} style={{ maxWidth: '280px', margin: '0 auto' }}>
                {upcomingProjects.map((project) => (
                  <div key={project.id} className="flex-shrink-0 w-[280px] snap-start">
                    {renderMobileProjectCard(project, false, upcomingScrollRefDesktop, true)}
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Projects - Desktop */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Completed</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide overflow-hidden" ref={completedScrollRefDesktop} style={{ maxWidth: '280px', margin: '0 auto' }}>
                {completedProjects.map((project) => (
                  <div key={project.id} className="flex-shrink-0 w-[280px] snap-start">
                    {renderMobileProjectCard(project, false, completedScrollRefDesktop, true)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});