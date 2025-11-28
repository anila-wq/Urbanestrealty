import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, Target } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { ABOUT_IMAGES, TEAM_IMAGES } from './constants/images';
import missionTargetImage from 'figma:asset/d684a6309c36018af7ce5c96c4bd646b41735b7d.png';

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
  {
    id: 5,
    name: "Your Name Here",
    role: "Business Development Manager",
    image: TEAM_IMAGES.placeholder,
  },
];

export function AboutUs() {
  return (
    <section id="about" className="pt-20 pb-2 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6 text-gray-900">ABOUT URBANEST REALTY</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Urbanest Realty brings you premium homes in Bangalore, crafting exceptional living spaces in prime locations across the city.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="mb-20">
          <div className="relative">
            <ImageWithFallback
              src={ABOUT_IMAGES.cityscape}
              alt="Modern cityscape representing our commitment to building dreams"
              className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10 rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center lg:inset-x-0 lg:top-0 lg:bottom-auto lg:pb-16">

            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <div className="space-y-6 text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              Empowering dreams, enriching lives. Urbanest Realty envisions becoming the beacon of excellence 
              in Bangalore's real estate sector, setting benchmarks through innovation, sustainability, and 
              unparalleled customer experiences.
            </p>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src={ABOUT_IMAGES.vision}
              alt="Vision and leadership - navigating towards our vision"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="space-y-6 text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              Our mission is to craft spaces that inspire, nurture, and stand the test of time. At Urbanest, 
              we believe it's not just about buildings, it's about the people who call them home.
            </p>
            <p className="text-gray-600 text-center max-w-4xl mx-auto">
              With integrity, creativity, and an unwavering commitment to quality, we strive to create 
              environments where families grow, connections deepen, and communities come alive. Every space 
              we shape is guided by the belief that thoughtful design has the power to enrich lives and 
              create lasting impact.
            </p>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src={ABOUT_IMAGES.mission}
              alt="Modern corporate building - embodying our mission of excellence"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute -inset-y-8 inset-x-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${missionTargetImage})` }}></div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mb-0">
          {/* Team Header */}
          <div className="text-center mb-16 mt-20">
            <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6 text-gray-900">
              MEET OUR TEAM
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the faces behind our mission – meet our
              dedicated team, driving innovation and excellence in
              every project we undertake.
            </p>
          </div>

          {/* Team Content - Using Mobile Layout for Both */}
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto w-full">
              {(() => {
                const filteredMembers = teamMembers.filter(member => member.id !== 5);
                const pairs = [];
                for (let i = 0; i < filteredMembers.length; i += 2) {
                  pairs.push(filteredMembers.slice(i, i + 2));
                }
                return pairs.map((pair, index) => (
                  <Card 
                    key={index} 
                    className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-gray-200"
                  >
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {pair.map((member) => (
                          <div key={member.id} className="flex flex-col items-center">
                            <div className="relative mt-6 mb-6">
                              <ImageWithFallback
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover shadow-lg"
                              />
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-gray-900/10 to-transparent"></div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                              {member.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 font-medium mb-4">
                              {member.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ));
              })()}
            </div>
          </div>

          {/* Team Bottom Description */}
          <div className="text-center mt-12">
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our leadership team combines decades of experience
              in real estate, construction, and business
              management to deliver exceptional results for our
              clients and stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
