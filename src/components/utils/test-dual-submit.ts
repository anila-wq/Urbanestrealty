/**
 * Test Utility for Dual Form Submission
 * Use this in browser console to test the submission
 */

import { submitToBothSystems } from './dual-form-submit';

/**
 * Test the dual submission with sample data
 * Open browser console and run: testDualSubmit()
 */
export async function testDualSubmit() {
  console.log('🧪 Testing Dual Form Submission...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const testData = {
    name: 'Test User',
    contact: '9999999999',
    email: 'test@example.com',
  };
  
  console.log('📝 Test Data:', testData);
  console.log('');
  console.log('Submitting to:');
  console.log('  1️⃣ Google Forms');
  console.log('  2️⃣ CRM Webhook');
  console.log('');
  
  try {
    const result = await submitToBothSystems(testData);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RESULTS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Overall Success: ${result.success ? '✅' : '❌'}`);
    console.log(`Google Forms:    ${result.googleFormsSuccess ? '✅ Submitted' : '❌ Failed'}`);
    console.log(`CRM Webhook:     ${result.webhookSuccess ? '✅ Submitted' : '❌ Failed'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (!result.googleFormsSuccess) {
      console.warn('⚠️ Google Forms submission may have failed.');
      console.warn('   Please check that you have updated the Entry IDs in:');
      console.warn('   /components/utils/dual-form-submit.ts');
    }
    
    if (!result.webhookSuccess) {
      console.warn('⚠️ Webhook submission may have failed.');
      console.warn('   This is expected due to CORS, but data should still be sent.');
    }
    
    console.log('');
    console.log('Next Steps:');
    console.log('  1. Check your Google Form responses');
    console.log('  2. Check your CRM webhook logs');
    console.log('  3. Verify data was received in both systems');
    
    return result;
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return null;
  }
}

/**
 * Display current configuration
 */
export function showCurrentConfig() {
  console.log('⚙️ Current Configuration:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Google Form URL:');
  console.log('  https://docs.google.com/forms/d/e/1FAIpQLSfg5KxUvwdGUJ6zKENzKJd_xt2PBwt10-vFj79qtekZ0HL1XA/formResponse');
  console.log('');
  console.log('Webhook URL:');
  console.log('  https://apps.cratiocrm.com/Customize/Webhooks/webhook.php?id=395555');
  console.log('');
  console.log('⚠️ To check Entry IDs, open:');
  console.log('  /components/utils/dual-form-submit.ts');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

/**
 * Show instructions for finding Entry IDs
 */
export function showEntryIDInstructions() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📋 HOW TO FIND GOOGLE FORM ENTRY IDs');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('STEP 1: Open your Google Form in EDIT mode:');
  console.log('👉 https://docs.google.com/forms/d/1FAIpQLSfg5KxUvwdGUJ6zKENzKJd_xt2PBwt10-vFj79qtekZ0HL1XA/edit');
  console.log('');
  console.log('STEP 2: Click three dots (⋮) → "Get pre-filled link"');
  console.log('');
  console.log('STEP 3: Fill in test data:');
  console.log('  Name:    Test Name');
  console.log('  Contact: 9999999999');
  console.log('  Email:   test@test.com');
  console.log('');
  console.log('STEP 4: Click "Get link" → "COPY LINK"');
  console.log('');
  console.log('STEP 5: The URL will look like:');
  console.log('  ...&entry.123456=Test+Name&entry.789012=9999999999&entry.345678=test@test.com');
  console.log('');
  console.log('STEP 6: Extract the numbers after "entry." and before "="');
  console.log('  Name:    entry.123456');
  console.log('  Contact: entry.789012');
  console.log('  Email:   entry.345678');
  console.log('');
  console.log('STEP 7: Update file: /components/utils/dual-form-submit.ts');
  console.log('  Replace the placeholder Entry IDs with YOUR actual IDs');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📖 For more help, see: QUICK_START_DUAL_FORMS.md');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).testDualSubmit = testDualSubmit;
  (window as any).showCurrentConfig = showCurrentConfig;
  (window as any).showEntryIDInstructions = showEntryIDInstructions;
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🎯 URBANEST REALTY - DUAL FORM SUBMISSION');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('✅ Forms now submit to:');
  console.log('   1. Google Forms (Google Sheets)');
  console.log('   2. CRM Webhook');
  console.log('   3. Email (Web3Forms)');
  console.log('');
  console.log('⚠️  ACTION REQUIRED:');
  console.log('   Update Google Form Entry IDs to complete setup');
  console.log('');
  console.log('💡 Available console commands:');
  console.log('   showEntryIDInstructions()  - How to find Entry IDs');
  console.log('   testDualSubmit()           - Test form submission');
  console.log('   showCurrentConfig()        - Show current URLs');
  console.log('');
  console.log('📚 Documentation:');
  console.log('   QUICK_START_DUAL_FORMS.md         - Quick start guide');
  console.log('   DUAL_SUBMISSION_COMPLETE_GUIDE.md - Complete guide');
  console.log('   HOW_TO_FIND_ENTRY_IDS.md          - Visual guide');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
}
