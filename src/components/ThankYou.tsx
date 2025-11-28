import { useEffect, useState } from 'react';
import { CheckCircle2, ArrowLeft, Check } from 'lucide-react';

export function ThankYou() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get name from sessionStorage (stored before navigation)
    const storedName = sessionStorage.getItem('thankYouName');
    const name = storedName || 'there';
    setUserName(name);
    
    // Clear the stored name after reading it
    if (storedName) {
      sessionStorage.removeItem('thankYouName');
    }

    // Track thank you page view
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Thank You - Form Submission',
        page_location: window.location.href,
        page_path: '/#thankyou',
      });
    }
  }, []);

  const handleGoBack = () => {
    // Close the tab or navigate back
    if (window.opener) {
      // If opened in new tab from parent, close this tab
      window.close();
    } else {
      // Otherwise navigate back to home
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-12 text-center">
          {/* Success Icon - Green Circle with Checkmark */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-block">
              {/* Outer light green circle */}
              <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center">
                {/* Inner white circle with checkmark */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-9 h-9 text-[#22c55e]" strokeWidth={3.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-[32px] mb-6 text-black" style={{ lineHeight: '1.2' }}>
            Thank you, {userName}!
          </h1>
          
          {/* Yellow underline decoration */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-[#fbbf24] rounded-full"></div>
          </div>

          {/* Success Confirmation with green checkmark */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Check className="w-5 h-5 text-[#22c55e]" strokeWidth={2.5} />
            <p className="text-[#22c55e] text-[17px]">
              Your enquiry has been submitted successfully
            </p>
          </div>

          {/* Additional Message */}
          <p className="text-[#666666] text-[15px] mb-8 leading-relaxed max-w-md mx-auto">
            We'll contact you shortly to discuss your requirements for Eastfield by Urbanest Realty
          </p>

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#e5e5e5] bg-white text-black rounded-lg hover:bg-gray-50 transition-colors text-[15px]"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Go Back
          </button>
        </div>

        {/* Contact Footer */}
        <div className="text-center mt-6">
          <p className="text-[#666666] text-[14px]">
            Need immediate assistance? Call us at{' '}
            <a 
              href="tel:+917090300066" 
              className="text-[#f97316] hover:text-[#ea580c] transition-colors no-underline"
            >
              +91 70903 00066
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
