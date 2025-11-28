import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from './ui/simple-toast';
import { FormData, validateFormData } from './utils/form-validation';
import { submitToBothSystems } from './utils/dual-form-submit';

interface EnquiryFormProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export function EnquiryForm({ children, isOpen: controlledIsOpen, onClose }: EnquiryFormProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    number: '',
    email: '',
    project: ''
  });

  // Use controlled state if provided, otherwise use uncontrolled state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const setIsOpen = (open: boolean) => {
    if (controlledIsOpen !== undefined && onClose) {
      if (!open) onClose();
    } else {
      setUncontrolledIsOpen(open);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateFormData(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    
    // Additional validation to ensure phone is not empty
    if (!formData.number || formData.number.trim() === '') {
      toast.error('Phone number is required');
      return;
    }

    // Detect if we're in a preview/development environment
    // Note: figma.site is production for Figma Make apps, so we allow it
    const isPreviewMode = window.location.hostname === 'localhost' || 
                          window.location.hostname.includes('127.0.0.1') ||
                          window.location.hostname.includes('local-');

    try {
      const accessKey = '2166cd5f-a57a-4eae-91df-ebe88267aa2d';
      
      const formPayload = {
        access_key: accessKey,
        subject: `🏢 New Enquiry - ${formData.name} | Urbanest Realty`,
        name: formData.name,
        email: formData.email,
        phone: formData.number || '',
        mobile: formData.number || '',
        project: formData.project || '',
        message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 NEW ENQUIRY - URBANEST REALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS:
   Name:  ${formData.name}
   Email: ${formData.email}
   Phone: ${formData.number}

🏢 INTERESTED PROJECT: ${formData.project}

📍 SOURCE: Website Enquiry Form (Awards Section)
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
        console.log('📋 DEMO MODE - Form data captured:', formPayload);
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
            'event_label': 'Enquiry Form - Demo',
          });
        }
        
        setFormData({ name: '', number: '', email: '', project: '' });
        setIsOpen(false);
        return;
      }

      // Production mode - make actual API call
      console.log('🚀 PRODUCTION MODE - Submitting form to Web3Forms, Google Forms, and Webhook...');
      console.log('📧 Email will be sent to: sales@urbanestrealty.in');
      console.log('📦 Payload:', formPayload);
      console.log('📱 Phone number check:', {
        'formData.number': formData.number,
        'phone field': formPayload.phone,
        'mobile field': formPayload.mobile,
        'isEmpty': !formData.number || formData.number.trim() === ''
      });
      
      try {
        // Submit to Google Forms and CRM Webhook FIRST (fire and forget - runs independently)
        submitToBothSystems({
          name: formData.name,
          contact: formData.number,
          email: formData.email,
          project: formData.project || '',
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
          console.log('✅ Form submitted successfully to all systems!');
          
          // Save submission time for rate limiting
          localStorage.setItem('lastFormSubmit', Date.now().toString());
          
          // Track conversion in Google Ads
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-11565888128/EnquiryFormSubmit',
              'value': 1.0,
              'currency': 'INR'
            });
            
            window.gtag('event', 'generate_lead', {
              'event_category': 'engagement',
              'event_label': 'Enquiry Form',
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
        
        // Track the attempt
        if (window.gtag) {
          window.gtag('event', 'form_fallback_submission', {
            'event_category': 'engagement',
            'event_label': 'Enquiry Form - Fallback',
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show user-friendly error with contact info
      toast.error('Please call us directly at +91 7090300066 or email sales@urbanestrealty.in');
    }
  };

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-white text-xl">Get in Touch</DialogTitle>
        <p className="text-gray-300 text-sm">
          Fill out the form below and we'll get back to you shortly.
        </p>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="number" className="text-white">
            Phone Number *
          </Label>
          <Input
            id="number"
            name="number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.number}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-white"
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
                id="enquiry-project-eastfield" 
                className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
              />
              <Label 
                htmlFor="enquiry-project-eastfield" 
                className="text-white cursor-pointer"
              >
                Eastfield
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="SereneExotica" 
                id="enquiry-project-serene" 
                className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
              />
              <Label 
                htmlFor="enquiry-project-serene" 
                className="text-white cursor-pointer"
              >
                Serene Exotica
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="Elite-35" 
                id="enquiry-project-elite" 
                className="border-2 border-white data-[state=checked]:border-white data-[state=checked]:bg-white w-5 h-5"
              />
              <Label 
                htmlFor="enquiry-project-elite" 
                className="text-white cursor-pointer"
              >
                Elite-35
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 border-white text-white hover:bg-white hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gray-900 text-white hover:bg-gray-800 border border-white"
          >
            Submit Enquiry
          </Button>
        </div>
      </form>
    </DialogContent>
  );

  // If children are provided, use as trigger
  if (children) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        {dialogContent}
      </Dialog>
    );
  }

  // Otherwise, use controlled mode
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {dialogContent}
    </Dialog>
  );
}