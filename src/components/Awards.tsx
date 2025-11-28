import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Trophy, Award, Star, Calendar, MapPin, Users, Building, ChevronRight, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EnquiryForm } from './EnquiryForm';
import { submitToBothSystems } from './utils/dual-form-submit';
import award1 from 'figma:asset/92fcfbb984f6e93f08a4cb7245793aee6da28572.png';
import award2 from 'figma:asset/c1d2c612d843b4c2a52b444dd36c1ec08c96acfb.png';
import award3 from 'figma:asset/458e7c46acdaa9d934cfb9933aca1833056fbf77.png';

const awards = [
  {
    id: 1,
    title: "Economic Times Business Awards 2025",
    category: "Emerging Developer of the Year - South India!",
    project: "Eastfield",
    description: "Recognized for outstanding architectural design and sustainable construction practices that set new standards in residential development.",
    year: "2025",
    organization: "Economic Times Business Awards 2025",
    images: [
      award1,
      award1
    ],
    icon: Trophy,
    color: "#FFD700",
    accent: "yellow"
  },
  {
    id: 3,
    title: "India Property Awards 2025",
    category: "Emerging Developer of the Year - South India!",
    project: "Urbanest Realty",
    description: "Awarded for exceptional commitment to environmental sustainability and eco-friendly building practices.",
    year: "2025",
    organization: "India Property Awards 2025",
    images: [
      award2,
      award2
    ],
    icon: Star,
    color: "#00FF7F",
    accent: "green"
  },
  {
    id: 2,
    title: "Economic Times Business Awards 2025",
    category: "Residential Project of the Year - Eastfield",
    project: "Elite-35",
    description: "Honored for implementing cutting-edge construction technologies and smart home integration that revolutionize modern living.",
    year: "2025",
    organization: "Economic Times Business Awards 2025",
    images: [
      award3,
      award3
    ],
    icon: Award,
    color: "#00BFFF",
    accent: "blue"
  }
];

// VisuallyHidden component for accessibility
function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

export function Awards() {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, title: string} | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const openImageModal = (src: string, alt: string, title: string) => {
    setSelectedImage({ src, alt, title });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to both Google Forms and CRM Webhook
      const result = await submitToBothSystems({
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
      });

      if (result.success) {
        // Show success message
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', contact: '', email: '' });
        
        // Track in Google Analytics if available
        if (window.gtag) {
          window.gtag('event', 'form_submission', {
            'event_category': 'engagement',
            'event_label': 'Awards Section Form',
          });
        }
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="awards" className="pt-16 pb-12 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">

          
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-gray-900 mt-4">
            AWARDS & RECOGNITION
          </h2>
        </div>

        {/* Awards Grid - Mobile Layout for All Devices */}
        <div className="grid grid-cols-1 gap-8 mb-20 max-w-3xl mx-auto">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            
            return (
              <div key={award.id} className="group">
                <Card className="h-full bg-white border-gray-200 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:shadow-2xl hover:transform hover:-translate-y-2">
                  {/* Award Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    {/* Main Award Image - Clickable */}
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => openImageModal(award.images[0], `${award.title} - Award Ceremony`, award.title)}
                    >
                      <ImageWithFallback
                        src={award.images[0]}
                        alt={`${award.title} - Award Ceremony`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* "View Full Size" Button - appears on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 shadow-lg">
                          <Maximize2 className="w-5 h-5 text-gray-900" />
                          <span className="text-gray-900 font-medium">View Full Size</span>
                        </div>
                      </div>
                    </div>



                  </div>

                  <CardContent className="p-6 pt-8 space-y-4">
                    {/* Category Badge */}
                    <Badge 
                      className="!bg-black !text-white font-medium px-3 py-1"
                    >
                      {award.category === 'Residential Project of the Year - Eastfield' ? 'Residential Real Estate Project of the Year' : (award.id === 1 ? award.category.replace(' - South India!', '') : award.category)}
                    </Badge>

                    {/* Award Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                      {award.id === 2 ? 'Times Business Awards 2025' : award.title}
                    </h3>

                    {/* Award Details */}
                    <div className="flex items-center justify-end text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{award.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center -mt-8">
          <p className="text-gray-700 mb-6 text-2xl font-bold">
            <span className="block">Ready to be part of</span>
            <span className="block">our award-winning legacy?</span>
          </p>
          <div className="max-w-md mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="awards-name" className="block text-sm mb-2 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="awards-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                  placeholder="Enter your name"
                />
              </div>
              <div className="text-left">
                <label htmlFor="awards-contact" className="block text-sm mb-2 text-gray-700">
                  Contact
                </label>
                <input
                  type="tel"
                  id="awards-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                  placeholder="Enter your contact number"
                />
              </div>
              <div className="text-left">
                <label htmlFor="awards-email" className="block text-sm mb-2 text-gray-700">
                  Email Id
                </label>
                <input
                  type="email"
                  id="awards-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                  placeholder="Enter your email"
                />
              </div>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                  ✓ Thank you! Your details have been submitted successfully. We'll contact you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center">
                  Something went wrong. Please contact us at sales@urbanestrealty.in
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="block mx-auto bg-gray-900 text-white font-medium px-12 py-3 rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Full-Size Image Popup Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeImageModal}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 m-0 bg-gray-900/95 border-0 rounded-none overflow-hidden">
          {selectedImage && (
            <>
              <VisuallyHidden>
                <DialogTitle>Award Image Viewer</DialogTitle>
                <DialogDescription>
                  View full size image of {selectedImage.title} - {selectedImage.alt}
                </DialogDescription>
              </VisuallyHidden>
              
              <div className="relative w-full h-full flex flex-col">
                {/* Top Bar with Image Info and Close Button */}
                <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900/90 to-transparent p-6 flex items-center justify-between">
                  <div className="text-white max-w-2xl">
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-300">{selectedImage.alt}</p>
                  </div>
                  
                  <button
                    onClick={closeImageModal}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-300 text-gray-900 hover:bg-white transition-colors ml-4 flex-shrink-0"
                    aria-label="Close image viewer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Full Size Image Container */}
                <div className="flex-1 flex items-center justify-center p-8">
                  <ImageWithFallback
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>

                {/* Bottom Instructions */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-600">
                  <p className="text-white text-sm flex items-center space-x-2">
                    <span>Press</span>
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs font-mono">ESC</kbd>
                    <span>or click</span>
                    <X className="w-4 h-4" />
                    <span>to close</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
