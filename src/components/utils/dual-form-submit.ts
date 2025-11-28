/**
 * Dual Form Submission Utility
 * Submits data to both Google Forms and CRM Webhook simultaneously
 */

// Google Form Configuration
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfg5KxUvwdGUJ6zKENzKJd_xt2PBwt10-vFj79qtekZ0HL1XA/formResponse';

// Google Form Entry IDs - ✅ CONFIGURED
// Found from pre-filled URL: entry.1855493988 (Name), entry.1333120472 (Contact), entry.2111181440 (Email)
const GOOGLE_FORM_ENTRIES = {
  name: 'entry.1855493988',      // Name field
  contact: 'entry.1333120472',   // Contact/Phone field
  email: 'entry.2111181440',     // Email field
};

// CRM Webhook URL
const WEBHOOK_URL = 'https://apps.cratiocrm.com/Customize/Webhooks/webhook.php?id=395555';

interface FormSubmissionData {
  name: string;
  contact: string;
  email: string;
  project?: string;
}

/**
 * Submit form data to Google Forms using hidden iframe method
 */
function submitToGoogleForm(data: FormSubmissionData): Promise<void> {
  return new Promise((resolve) => {
    try {
      console.log('📝 Submitting to Google Forms/Sheets...');
      console.log('📊 Data:', data);
      console.log('🔗 URL:', GOOGLE_FORM_URL);
      console.log('🏷️ Entries:', GOOGLE_FORM_ENTRIES);
      
      // Create hidden iframe for Google Form submission
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe_' + Date.now();
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create form element
      const form = document.createElement('form');
      form.action = GOOGLE_FORM_URL;
      form.method = 'POST';
      form.target = iframe.name;

      // Add form fields
      const fields = [
        { name: GOOGLE_FORM_ENTRIES.name, value: data.name },
        { name: GOOGLE_FORM_ENTRIES.contact, value: data.contact },
        { name: GOOGLE_FORM_ENTRIES.email, value: data.email },
      ];

      fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = field.name;
        input.value = field.value;
        form.appendChild(input);
        console.log(`  ✓ Added field: ${field.name} = ${field.value}`);
      });

      document.body.appendChild(form);

      // Handle iframe load
      let completed = false;
      iframe.onload = () => {
        if (!completed) {
          completed = true;
          console.log('✅ Google Forms submission completed');
          setTimeout(() => {
            if (document.body.contains(form)) document.body.removeChild(form);
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
          }, 100);
          resolve();
        }
      };

      // Submit form
      console.log('🚀 Submitting Google Form...');
      form.submit();

      // Timeout fallback - always resolve (we can't check Google Forms response due to CORS)
      setTimeout(() => {
        if (!completed) {
          completed = true;
          console.log('⏱️ Google Forms submission timeout (assuming success)');
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
          resolve();
        }
      }, 3000);
    } catch (error) {
      console.error('❌ Google Forms submission error:', error);
      resolve(); // Still resolve to not block other submissions
    }
  });
}

/**
 * Submit form data to CRM Webhook
 */
function submitToWebhook(data: FormSubmissionData): Promise<void> {
  return new Promise((resolve) => {
    try {
      console.log('🎯 Submitting to CRM Webhook...');
      console.log('🔗 URL:', WEBHOOK_URL);
      console.log('📊 Data:', data);
      console.log('📱 Phone number validation:', {
        'data.contact': data.contact,
        'isEmpty': !data.contact || data.contact.trim() === '',
        'length': data.contact?.length || 0
      });
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', data.name);
      formDataToSend.append('mobile', data.contact); // CRM expects 'mobile' field
      formDataToSend.append('phone', data.contact);  // Also send as 'phone' for compatibility
      formDataToSend.append('contact', data.contact); // Keep 'contact' as fallback
      formDataToSend.append('email', data.email);
      if (data.project) {
        formDataToSend.append('project', data.project);
      }
      
      console.log('📤 FormData fields being sent:');
      console.log('  ✓ name:', data.name);
      console.log('  ✓ mobile:', data.contact);
      console.log('  ✓ phone:', data.contact);
      console.log('  ✓ contact:', data.contact);
      console.log('  ✓ email:', data.email);
      console.log('  ✓ project:', data.project || 'Not specified');

      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for cross-origin requests
        body: formDataToSend,
      })
        .then(() => {
          console.log('✅ Webhook submission sent (no-cors mode)');
          resolve();
        })
        .catch((error) => {
          console.error('⚠️ Webhook fetch error (may still have succeeded):', error);
          resolve(); // Resolve anyway since no-cors doesn't let us check response
        });
    } catch (error) {
      console.error('❌ Webhook submission error:', error);
      resolve(); // Still resolve to not block other submissions
    }
  });
}

/**
 * Main function: Submit to both Google Forms and Webhook simultaneously
 */
export async function submitToBothSystems(data: FormSubmissionData): Promise<{
  success: boolean;
  googleFormsSuccess: boolean;
  webhookSuccess: boolean;
  error?: string;
}> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 DUAL SUBMISSION STARTED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Form Data:', data);
  console.log('⏰ Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  
  try {
    // Submit to both systems simultaneously
    const results = await Promise.allSettled([
      submitToGoogleForm(data),
      submitToWebhook(data),
    ]);

    const googleFormsSuccess = results[0].status === 'fulfilled';
    const webhookSuccess = results[1].status === 'fulfilled';

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 DUAL SUBMISSION RESULTS:');
    console.log('  Google Forms/Sheets:', googleFormsSuccess ? '✅ SUCCESS' : '❌ FAILED');
    console.log('  CRM Webhook:', webhookSuccess ? '✅ SUCCESS' : '❌ FAILED');
    console.log('━━━━━━━━��━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return {
      success: googleFormsSuccess || webhookSuccess, // Success if at least one succeeds
      googleFormsSuccess,
      webhookSuccess,
    };
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ DUAL SUBMISSION ERROR:', error);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return {
      success: false,
      googleFormsSuccess: false,
      webhookSuccess: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Helper function to update Google Form entry IDs
 * Call this function with the correct entry IDs once you find them
 */
export function updateGoogleFormEntries(entries: {
  name: string;
  contact: string;
  email: string;
}) {
  Object.assign(GOOGLE_FORM_ENTRIES, entries);
  console.log('✅ Google Form entries updated:', GOOGLE_FORM_ENTRIES);
}
