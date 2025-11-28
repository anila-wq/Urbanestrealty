// Global type declarations for Urbanest Realty

// Google Analytics & Google Ads gtag function
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

// Declare modules for image imports
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

// Figma asset imports
declare module 'figma:asset/*' {
  const value: string;
  export default value;
}
