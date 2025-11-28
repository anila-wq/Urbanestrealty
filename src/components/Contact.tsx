import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { submitToBothSystems } from './utils/dual-form-submit';
import { toast } from './ui/simple-toast';

export function Contact() {
  const [isChecked, setIsChecked] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.contact || !formData.project) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Additional validation to ensure phone is not empty
    if (!formData.contact || formData.contact.trim() === '') {
      toast.error('Phone number is required');
      return;
    }
    
    // Validate project selection
    if (!formData.project) {
      toast.error('Please select a project');
      return;
    }
    
    // Check for rate limiting (client-side cooldown)
    const lastSubmitTime = localStorage.getItem('lastFormSubmit');
    const cooldownMinutes = 2; // 2 minutes between submissions
    
    if (lastSubmitTime) {
      const timeSinceLastSubmit = Date.now() - parseInt(lastSubmitTime);
      const cooldownMs = cooldownMinutes * 60 * 1000;
      
      if (timeSinceLastSubmit < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - timeSinceLastSubmit) / 1000);
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsDisplay = remainingSeconds % 60;
        
        toast.error(
          `Please wait ${remainingMinutes}:${remainingSecondsDisplay.toString().padStart(2, '0')} before submitting again.`
        );
        return;
      }
    }
    
    setIsSubmitting(true);

    // Detect if we're in a preview/development environment
    // Note: figma.site is production for Figma Make apps, so we allow it
    const isPreviewMode = window.location.hostname === 'localhost' || 
                          window.location.hostname.includes('127.0.0.1') ||
                          window.location.hostname.includes('local-');

    try {
      const accessKey = '2166cd5f-a57a-4eae-91df-ebe88267aa2d';
      
      const formPayload = {
        access_key: accessKey,
        subject: `📧 Contact Form - ${formData.name} | Urbanest Realty`,
        name: formData.name,
        email: formData.email,
        phone: formData.contact || '',
        mobile: formData.contact || '',
        project: formData.project,
        message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CONTACT FORM SUBMISSION - URBANEST REALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS:
   Name:  ${formData.name}
   Email: ${formData.email}
   Phone: ${formData.contact}

🏢 INTERESTED PROJECT: ${formData.project}

✅ Consent: ${isChecked ? 'Yes - Agreed to receive updates' : 'No'}

📍 SOURCE: Website Contact Form (Enquire Now Section)
⏰ TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ACTION REQUIRED: Please contact them ASAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        from_name: 'Urbanest Realty Website',
        replyto: formData.email,
      };

      // In preview mode, simulate submission without making actual API call
      if (isPreviewMode) {
        console.log('📋 DEMO MODE - Contact form data captured:', formPayload);
        console.log('✅ In production, this will be sent to:', 'sales@urbanestrealty.in');
        
        // Simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Store name in sessionStorage and navigate to thank you page
        sessionStorage.setItem('thankYouName', formData.name);
        window.location.hash = '#thankyou';
        
        // Track the demo submission
        if (window.gtag) {
          window.gtag('event', 'form_demo_submission', {
            'event_category': 'engagement',
            'event_label': 'Contact Form - Demo',
          });
        }
        
        setFormData({ name: '', email: '', contact: '', project: '' });
        setIsChecked(true);
        setIsSubmitting(false);
        return;
      }

      // Production mode - make actual API call
      console.log('🚀 PRODUCTION MODE - Submitting contact form to Web3Forms, Google Forms, and Webhook...');
      console.log('📧 Email will be sent to: sales@urbanestrealty.in');
      console.log('📦 Payload:', formPayload);
      console.log('📱 Phone number check:', {
        'formData.contact': formData.contact,
        'phone field': formPayload.phone,
        'mobile field': formPayload.mobile,
        'isEmpty': !formData.contact || formData.contact.trim() === ''
      });
      
      try {
        // Submit to Google Forms and CRM Webhook FIRST (fire and forget - runs independently)
        submitToBothSystems({
          name: formData.name,
          contact: formData.contact,
          email: formData.email,
          project: formData.project,
        }).then(result => {
          console.log('📊 Dual submission completed:', result);
          if (result.googleFormsSuccess) {
            console.log('✅ Google Sheets updated successfully');
          } else {
            console.warn('⚠️ Google Sheets submission may have failed');
          }
          if (result.webhookSuccess) {
            console.log('✅ Webhook called successfully');
          } else {
            console.warn('⚠️ Webhook submission may have failed');
          }
        }).catch(err => {
          console.error('❌ Dual submission error (continuing anyway):', err);
        });
        
        // Then submit to Web3Forms for email notification (await this one)
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formPayload),
        });

        console.log('📡 Response status:', response.status, response.statusText);
        
        const data = await response.json();
        console.log('📬 Response data:', data);

        if (response.ok && data.success) {
          console.log('✅ Contact form submitted successfully to Web3Forms!');
          
          // Save submission time for rate limiting
          localStorage.setItem('lastFormSubmit', Date.now().toString());
          
          // Track conversion in Google Ads
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-11565888128/ContactFormSubmit',
              'value': 1.0,
              'currency': 'INR'
            });
            
            window.gtag('event', 'generate_lead', {
              'event_category': 'engagement',
              'event_label': 'Contact Form',
              'value': 1
            });
          }
          
          // Store name in sessionStorage and navigate to thank you page
          sessionStorage.setItem('thankYouName', formData.name);
          window.location.hash = '#thankyou';
        } else {
          // Handle specific error messages
          if (data.message && data.message.toLowerCase().includes('rate limit')) {
            localStorage.setItem('lastFormSubmit', Date.now().toString());
            toast.error('Too many requests. Please try again after 2 minutes or call us at +91 7090300066');
          } else {
            throw new Error(data.message || 'Form submission failed');
          }
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        
        // If fetch fails, try using a form submission as fallback
        console.log('⚠️ Direct API call blocked. Using form submission fallback...');
        
        // Create a hidden form and submit it
        const thankYouUrl = `${window.location.origin}/thankyou.html?name=${encodeURIComponent(formData.name)}`;
        
        const form = document.createElement('form');
        form.action = 'https://api.web3forms.com/submit';
        form.method = 'POST';
        form.style.display = 'none';
        
        // Add all fields
        Object.entries(formPayload).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });
        
        // Add redirect URL to thank you page
        const redirectInput = document.createElement('input');
        redirectInput.type = 'hidden';
        redirectInput.name = 'redirect';
        redirectInput.value = thankYouUrl;
        form.appendChild(redirectInput);
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        // Save submission time for rate limiting
        localStorage.setItem('lastFormSubmit', Date.now().toString());
        
        // Note: The form submission will redirect to thank you page automatically
        // Form state will be cleared when page redirects
        
        // Track the attempt
        if (window.gtag) {
          window.gtag('event', 'form_fallback_submission', {
            'event_category': 'engagement',
            'event_label': 'Contact Form - Fallback',
          });
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Show user-friendly error with contact info
      toast.error('Please call us directly at +91 7090300066 or email sales@urbanestrealty.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold mb-6 text-white">ENQUIRE NOW</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ready to find your dream home? Get in touch with us today and let our team help you 
            discover the perfect property that matches your lifestyle and budget.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send Us Your Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name" 
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email ID *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-white">Contact *</Label>
                      <Input 
                        id="contact" 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <Label className="text-white block mb-4">Select Project *</Label>
                      <RadioGroup 
                        value={formData.project} 
                        onValueChange={(value) => setFormData({...formData, project: value})}
                        className="space-y-1"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value="Eastfield" 
                            id="project-eastfield" 
                            className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
                          />
                          <Label 
                            htmlFor="project-eastfield" 
                            className="text-white cursor-pointer"
                          >
                            Eastfield
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value="SereneExotica" 
                            id="project-serene" 
                            className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
                          />
                          <Label 
                            htmlFor="project-serene" 
                            className="text-white cursor-pointer"
                          >
                            SereneExotica
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value="Elite-35" 
                            id="project-elite" 
                            className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
                          />
                          <Label 
                            htmlFor="project-elite" 
                            className="text-white cursor-pointer"
                          >
                            Elite-35
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agree" 
                        checked={isChecked}
                        onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                        className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
                      />
                      <Label htmlFor="agree" className="text-sm text-gray-300">
                        I agree to receive more information
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-white text-black hover:bg-gray-200" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </Button>

                    <p className="text-sm text-gray-400">
                      By submitting this form, you agree to our privacy policy and consent to being contacted 
                      by our team regarding your inquiry.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us</h4>
                    <p className="text-gray-300 text-sm">
                      +91 7090300066
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Us</h4>
                    <p className="text-gray-300 text-sm">
                      sales@urbanestrealty.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Visit Our Office</h4>
                    <p className="text-gray-300 text-sm">
                      1st Floor, No. 2, Shrusti Layout, Phase I,<br />
                      Basavanapura Main Road, KR Puram,<br />
                      Bengaluru, Karnataka, 560036
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Business Hours</h4>
                    <p className="text-gray-300 text-sm">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-white">Quick Response Guarantee</h3>
                <p className="text-sm text-gray-300 mb-4">
                  We value your time and ensure prompt responses. Our team will get back to you within 
                  2 hours during business hours.
                </p>
                <Button variant="outline" size="sm" className="w-full border-white text-white hover:bg-white hover:text-black">
                  Schedule Site Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}