import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Building2,
  MessageCircle
} from 'lucide-react';
import logo from 'figma:asset/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png';
import { EnquiryForm } from './EnquiryForm';

const footerLinks = {
  quickLinks: [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact Us', href: '#contact' }
  ],
  projects: [
    { name: 'Eastfield', href: 'https://squad-fish-91293738.figma.site/' },
    { name: 'Elite-35', href: '#elite-35' },
    { name: 'Serene Exotica', href: 'https://squad-fish-91293738.figma.site' }
  ],
  services: [
    { name: 'Property Sales', href: '#sales' },
    { name: 'Property Consultation', href: '#consultation' },
    { name: 'Investment Advisory', href: '#advisory' },
    { name: 'After Sales Support', href: '#support' }
  ]
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/people/Urbanest-Realty/61555019245999/?rdid=chfHHsZjXiFGkrh2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GDdMW9MHq%2F', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/urbanest_realty/?igsh=MTM5bWNpdjM4ZmY2dA%3D%3D#', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/urbanest-realty-669997303/', label: 'LinkedIn' }
];

export function Footer() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-center mb-4">
              <img src={logo} alt="Urbanest Realty Logo" className="h-16 w-auto mr-3" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              We are committed to delivering the highest quality of construction and upholding our promises. 
              Our primary goal is to ensure complete customer satisfaction and foster lasting relationships.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors">
                  <Phone className="h-5 w-5 text-gray-100" />
                </div>
                <div>
                  <a 
                    href="tel:+917090300066" 
                    className="text-gray-300 hover:text-gray-100 transition-colors text-xl font-semibold cursor-pointer"
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'conversion', {
                          'send_to': 'AW-11565888128/PhoneClick',
                          'value': 1.0,
                          'currency': 'INR'
                        });
                        window.gtag('event', 'phone_call', {
                          'event_category': 'engagement',
                          'event_label': 'Footer Phone Click'
                        });
                      }
                    }}
                  >
                    +91 7090300066
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors">
                  <Mail className="h-5 w-5 text-gray-100" />
                </div>
                <div>
                  <a 
                    href="mailto:sales@urbanestrealty.in" 
                    className="text-gray-300 hover:text-gray-100 transition-colors text-xl font-semibold cursor-pointer"
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'email_click', {
                          'event_category': 'engagement',
                          'event_label': 'Footer Email Click'
                        });
                      }
                    }}
                  >
                    sales@urbanestrealty.in
                  </a>
                </div>
              </div>
              <div className="flex items-start justify-center group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-gray-700 transition-colors">
                  <MapPin className="h-5 w-5 text-gray-100" />
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    1st Floor, No. 2, Shrusti Layout, Phase I,<br />
                    Basavanapura Main Road, KR Puram,<br />
                    Bengaluru, Karnataka, 560036
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Projects */}
          <div className="bg-gray-800/50 px-6 pt-6 pb-4 -mb-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl mb-4 text-gray-100">Quick Links</h3>
                <ul className="space-y-2">
                  {footerLinks.quickLinks.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-gray-100 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4 text-gray-100">Our Projects</h3>
                <ul className="space-y-2">
                  {footerLinks.projects.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.name === 'Eastfield' ? 'https://www.urbanesteastfield.com/' : link.name === 'Elite-35' ? 'https://date-relume-15377570.figma.site' : link.name === 'Serene Exotica' ? 'https://sereneexotica.in' : link.href}
                        className="text-gray-400 hover:text-gray-100 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-bold text-gray-100 mb-3">Connect With Us</h4>
            <div className="flex space-x-3 justify-center">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 ${social.className || 'bg-gray-800 hover:bg-gray-700'} rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 group`}
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5 text-gray-100 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-4 lg:space-y-0 text-center">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="text-gray-400">
                © 2024 Urbanest Realty. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-100 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Designed with care for our customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Dialog */}
      <EnquiryForm 
        isOpen={showEnquiry} 
        onClose={() => setShowEnquiry(false)} 
      />
    </footer>
  );
}
