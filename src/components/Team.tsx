import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import { TEAM_IMAGES } from "./constants/images";

const teamMembers = [
  {
    id: 1,
    name: "Mohan R",
    role: "Managing Partner",
    image: TEAM_IMAGES.mohan,
  },
  {
    id: 2,
    name: "Shaik Mehaboob Basha",
    role: "Partner",
    image: TEAM_IMAGES.mehaboob,
  },
  {
    id: 3,
    name: "Manish Batra",
    role: "Strategy Partner",
    image: TEAM_IMAGES.manish,
  },
  {
    id: 4,
    name: "Nagendra K",
    role: "Sales Director",
    image: TEAM_IMAGES.nagendra,
  },
];

export function Team() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Only enable auto-scroll on tablet and up (lg breakpoint)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    const autoScroll = () => {
      if (mediaQuery.matches) {
        const nextButton = carousel.querySelector(
          '[data-carousel="next"]',
        ) as HTMLButtonElement;
        if (nextButton) {
          nextButton.click();
        }
      }
    };

    const interval = setInterval(autoScroll, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="team" className="py-16 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            MEET OUR TEAM
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the faces behind our mission – meet our
            dedicated team, driving innovation and excellence in
            every project we undertake.
          </p>
        </div>

        {/* Team Content - Responsive Layout */}
        <div className="flex justify-center">
          {/* Desktop: Grid Layout for 4 team members */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:max-w-7xl">
            {teamMembers.map((member) => (
              <Card 
                key={member.id} 
                className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gray-900 border-gray-700 h-full overflow-visible"
              >
                <CardContent className="!p-0 overflow-visible">
                  <div className="pt-32 px-6">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-lg object-cover mx-auto shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent w-40 h-40 mx-auto"></div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white whitespace-nowrap">
                    {member.name}
                  </h3>
                  <p className="text-white font-medium mb-4">
                    {member.role}
                  </p>
                  </div>
                  <div className="pb-6"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile/Tablet: Vertical Stack Layout */}
          <div className="lg:hidden w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <Card 
                  key={member.id} 
                  className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gray-900 border-gray-700 h-full"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-40 rounded-lg object-cover mx-auto shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent w-40 h-40 mx-auto"></div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">
                      {member.name}
                    </h3>
                    <p className="text-white font-medium mb-4">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Description */}
        <div className="text-center mt-12">
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our leadership team combines decades of experience
            in real estate, construction, and business
            management to deliver exceptional results for our
            clients and stakeholders.
          </p>
        </div>
      </div>
    </section>
  );
}