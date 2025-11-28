import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Calendar, Phone, Mail } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative pt-12 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Luxury apartment interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-white mb-6">
            READY TO FIND YOUR
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              DREAM HOME?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Take the first step towards luxury living. Our expert team is ready to help you 
            discover the perfect apartment that matches your lifestyle and aspirations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Tour
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Mail className="mr-2 h-5 w-5" />
              Get Brochure
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-4 text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <Phone className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Call Us Today</div>
                <div className="text-gray-300">+1 (555) 123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <Mail className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-300">info@urbanestrealty.com</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-3">Exclusive Offer</h3>
            <p className="text-gray-200 mb-4">
              Book a tour this month and receive a complimentary home consultation with our interior design team.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mx-auto">
              Claim Your Offer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}