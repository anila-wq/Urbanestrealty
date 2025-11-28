import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Star } from 'lucide-react';
import { TESTIMONIAL_IMAGES } from './constants/images';

const testimonials = [
  {
    id: 1,
    name: 'Sanchit Patel',
    role: '',
    location: '',
    image: TESTIMONIAL_IMAGES.client1,
    rating: 5,
    text: 'Their team was knowledgeable, friendly and guided us through every step of the process. Highly recommend Urbanest Realty!',
  },
  {
    id: 2,
    name: 'Ankit Gupta',
    role: '',
    location: '',
    image: TESTIMONIAL_IMAGES.client2,
    rating: 5,
    text: 'From property selection to final paperwork, the experience with Urbanest Realty was seamless and stress-free.',
  },
  {
    id: 3,
    name: 'Raghunath Mishra',
    role: '',
    location: '',
    image: TESTIMONIAL_IMAGES.client3,
    rating: 5,
    text: 'Urbanest Realty earned our trust with their transparent dealings and attention to our needs.',
  },
  {
    id: 4,
    name: 'Hema Kumar',
    role: '',
    location: '',
    image: TESTIMONIAL_IMAGES.client1,
    rating: 5,
    text: 'Their in-depth market knowledge and customer-first approach set Urbanest Realty apart. Truly outstanding!',
  },
  {
    id: 5,
    name: 'Khushi Nehwal',
    role: '',
    location: '',
    image: TESTIMONIAL_IMAGES.client2,
    rating: 5,
    text: 'Urbanest Realty made our dream home search effortless. Their professionalism and dedication ensured we found the perfect property quickly.',
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="pt-12 pb-2 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6 text-gray-900">WHAT OUR CUSTOMERS SAY</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers who have experienced 
            the Urbanest difference in their homebuying journey.
          </p>
        </div>

        {/* Testimonials Scrollable Container */}
        <div className="relative mb-8">
          <div className="overflow-x-auto overflow-y-hidden pb-6 scrollbar-thin" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
            <div className="flex gap-6 px-2 py-2">
              {testimonials.map((testimonial) => (
                <Card 
                  key={testimonial.id} 
                  className="flex-none w-[320px] sm:w-[360px] md:w-[400px] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-gray-200"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 mt-4">{testimonial.name}</h4>
                      </div>
                    </div>
                    
                    <StarRating rating={testimonial.rating} />
                    
                    <blockquote className="mt-4 text-gray-700 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">← Scroll horizontally to view all testimonials →</p>
          </div>
        </div>


      </div>
    </section>
  );
}
