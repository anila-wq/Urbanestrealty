import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Train, Car, Plane, ShoppingBag, GraduationCap, Hospital } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const locations = [
  {
    name: 'Downtown District',
    project: 'Eastfield',
    description: 'Prime location in the heart of the financial district',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: Train, label: 'Metro Station', distance: '2 min walk' },
      { icon: ShoppingBag, label: 'Shopping Mall', distance: '5 min drive' },
      { icon: GraduationCap, label: 'Top Schools', distance: '10 min drive' },
    ]
  },
  {
    name: 'Business Bay',
    project: 'Elite-35',
    description: 'Modern business district with corporate headquarters',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: Car, label: 'Highway Access', distance: '3 min drive' },
      { icon: Hospital, label: 'Medical Center', distance: '8 min drive' },
      { icon: ShoppingBag, label: 'Business Hub', distance: '1 min walk' },
    ]
  },
  {
    name: 'Waterfront Views',
    project: 'Serene Exotica',
    description: 'Exclusive waterfront location with marina access',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      { icon: Plane, label: 'Airport', distance: '20 min drive' },
      { icon: ShoppingBag, label: 'Luxury Retail', distance: '5 min walk' },
      { icon: Train, label: 'Water Taxi', distance: 'Direct access' },
    ]
  }
];

const cityHighlights = [
  'World-class dining and entertainment',
  'Excellent public transportation network',
  'Top-rated healthcare facilities',
  'Premier educational institutions',
  'Thriving business ecosystem',
  'Rich cultural attractions'
];

export function Location() {
  return (
    <section id="location" className="pt-12 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6">PRIME LOCATIONS</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our projects are strategically located in the city's most desirable neighborhoods, 
            offering unparalleled connectivity and access to everything you need.
          </p>
        </div>

        {/* Location Cards - Mobile Layout for All Devices */}
        <div className="grid grid-cols-1 gap-8 mb-16 max-w-3xl mx-auto">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <ImageWithFallback
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{location.project}</span>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {location.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{location.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {location.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={featureIndex} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{feature.label}</span>
                        </div>
                        <span className="text-sm text-primary font-medium">{feature.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* City Overview */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-2xl font-bold mb-6">Why Bangalore?</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Our developments are situated in Bangalore, India's Silicon Valley, offering residents 
              access to exceptional amenities, career opportunities, and lifestyle benefits.
            </p>
            <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
              {cityHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="City skyline view"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-xl font-bold">Connected Living</h4>
              <p className="text-sm opacity-90">Everything you need within reach</p>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-2xl font-bold mb-6 text-center">Visit Our Office</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4985!2d77.6961!3d13.0127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzQ1LjciTiA3N8KwNDEnNDYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Urbanest Realty Office Location"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground mb-2">1st Floor, No. 2, Shrusti Layout, Phase I, Basavanapura Main Road, KR Puram, Bengaluru, Karnataka, 560036</p>
            <a
              href="https://maps.google.com/?q=1st+Floor+No+2+Shrusti+Layout+Phase+I+Basavanapura+Main+Road+KR+Puram+Bengaluru+Karnataka+560036"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}