# 🛠️ Technology Stack - Urbanest Realty

## Languages

### Primary Languages
- **TypeScript** (.tsx) - Main development language for type-safe React components
- **CSS** - Styling with Tailwind CSS and custom globals
- **HTML** - Semantic markup and 404 page
- **Markdown** - Documentation files

---

## Core Frameworks

### Frontend Framework
- **React 18+** - Modern React with Hooks, Suspense, and Error Boundaries
  - Lazy loading for performance optimization
  - StrictMode for development best practices
  - Error Boundary for graceful error handling

### CSS Framework
- **Tailwind CSS 4.0** - Utility-first CSS framework
  - Custom design tokens in `globals.css`
  - Responsive design utilities
  - Dark mode support

---

## UI Component Libraries

### Shadcn/ui Components
Complete UI component library built on Radix UI:

**Layout Components:**
- Card, Separator, Aspect Ratio
- Scroll Area, Resizable
- Sidebar, Sheet

**Form Components:**
- Input, Textarea, Label
- Select, Checkbox, Radio Group
- Switch, Slider
- Input OTP, Calendar
- Form (with validation)

**Navigation Components:**
- Navigation Menu, Menubar
- Breadcrumb, Pagination
- Tabs, Command

**Overlay Components:**
- Dialog, Alert Dialog
- Drawer, Popover, Hover Card
- Dropdown Menu, Context Menu
- Tooltip

**Feedback Components:**
- Alert, Badge, Progress
- Skeleton, Toast (Sonner)
- Avatar

**Data Display:**
- Table, Carousel
- Chart, Collapsible
- Toggle, Toggle Group

**Custom Simple Components:**
- Simple Avatar, Simple Badge
- Simple Button, Simple Card
- Simple Carousel, Simple Dialog
- Simple Input, Simple Label
- Simple Toast

---

## Icon Library

### Lucide React
- **Package:** `lucide-react`
- Modern, customizable icon library
- Tree-shakeable for optimal bundle size
- Used icons include:
  - Menu, X (navigation)
  - MapPin, Phone, Mail (contact)
  - Award, Users, Target, Eye (about)
  - ChevronLeft, ChevronRight (carousel)
  - Check, AlertCircle (forms)
  - Building2, Home (real estate)

---

## Third-Party Libraries

### Carousel/Slider
- **React Slick** - Carousel component
  - Used for Projects showcase
  - Used for Testimonials section
  - Responsive breakpoints
  - Auto-play support

### Underlying Dependencies
- **Radix UI** - Headless UI components
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-toast`
  - And other Radix primitives

- **Embla Carousel** - Carousel engine
  - Used by Shadcn carousel component
  - Touch-friendly
  - Accessibility support

- **Class Variance Authority (CVA)** - For component variants
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind classes without conflicts

---

## Form & Validation

### Form Handling
- **React Hook Form 7.55.0** - Form state management
  - Efficient re-renders
  - Built-in validation
  - TypeScript support

### Form Submission
- **Web3Forms API** - Email form service
  - Access Key: `2166cd5f-a57a-4eae-91df-ebe88267aa2d`
  - Rate limiting handling
  - Email forwarding to: `sales@urbanestrealty.in`

### Custom Utilities
- `dual-form-submit.ts` - Handles dual submission (Web3Forms + Google Forms)
- `form-validation.ts` - Custom validation rules
- `test-dual-submit.ts` - Testing utilities

---

## Analytics & Tracking

### Google Analytics
- **GA4** - Google Analytics 4
  - Measurement ID: `G-XXXXXXXXXX` (to be configured)
  - Custom event tracking
  - Performance monitoring
  - User behavior analytics

### Google Ads
- **Google Ads Conversion Tracking**
  - Ads ID: `AW-11565888128`
  - Page view tracking
  - Form submission tracking

### Custom Performance Monitoring
- **PerformanceMonitor Component** - Custom performance tracking
  - Page load metrics
  - Component render times
  - User interaction tracking

---

## Maps Integration

### Google Maps
- **Google Maps Embed API**
  - Office location display
  - Interactive map
  - Responsive iframe

---

## Communication Tools

### WhatsApp Business
- **WhatsApp API Integration**
  - Floating action button
  - Direct messaging: `+91 9972505291`
  - Pre-filled message template
  - Mobile-optimized

### Email
- Automated form submissions to `sales@urbanestrealty.in`
- Click-to-email functionality

### Phone
- Click-to-call: `+91 7090300066`
- Mobile-optimized tel: links

---

## Build Tools & Configuration

### TypeScript Configuration
- **TypeScript** - Type safety and better DX
- `global.d.ts` - Global type definitions
- Strict mode enabled

### Module Bundling
- ES Modules (ESM)
- Tree-shaking for optimal bundle size
- Code splitting with React.lazy()

### Assets
- **Figma Assets** - Custom image handling
  - `figma:asset/` imports for optimized images
  - PNG, JPG support
  - Custom TypeScript exports

---

## Performance Optimizations

### Code Splitting
- **React.lazy()** - Lazy load components
  - AboutUs, Testimonials, Awards
  - Footer, WhatsAppFloat
  - Reduces initial bundle size

### Image Optimization
- **ImageWithFallback Component** - Custom image component
  - Lazy loading
  - Fallback support
  - Error handling

### Loading Strategies
- **Suspense** - Handle async components
- **DNS Prefetch** - Faster external link navigation
- **Deferred Analytics** - Load after page interactive

---

## Social Media Integration

### Platforms
- **Facebook** - Company page link
- **Instagram** - Brand profile
- **LinkedIn** - Professional network
- **YouTube** - Video content (placeholder)
- **Twitter/X** - Social updates (placeholder)

---

## External APIs & Services

### Form Services
1. **Web3Forms** - Primary form handler
   - Endpoint: `https://api.web3forms.com/submit`
   - Email notifications
   - Spam protection

2. **Google Forms** (Backup)
   - Dual submission strategy
   - Data backup
   - Alternative delivery

### Maps
- **Google Maps Embed API** - Map display

### Analytics
- **Google Tag Manager (gtag.js)** - Analytics tracking

---

## Development Tools

### Type Checking
- TypeScript compiler
- React TypeScript types
- Custom type definitions

### Code Quality
- React StrictMode
- Error Boundaries
- Console logging (dev only)

### File Organization
```
/components        - React components
  /ui             - Reusable UI components
  /constants      - Constants and images
  /utils          - Utility functions
  /figma          - Figma integration utilities
/images           - Static assets
/styles           - Global CSS
```

---

## Deployment

### Platform
- **GitHub Pages** - Static site hosting
  - Custom domain support
  - HTTPS enabled
  - CDN delivery

### Configuration Files
- `404.html` - SPA routing for GitHub Pages
- `.nojekyll` - Disable Jekyll processing

---

## Security Features

### Form Security
- Client-side validation
- Spam protection via Web3Forms
- Rate limiting
- Input sanitization

### External Links
- Secure target="_blank" with rel="noopener noreferrer"
- HTTPS enforcement
- Safe external resource loading

---

## Accessibility

### Standards
- **WCAG 2.1** compliance
- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

### Features
- Focus management
- Alt text on images
- Proper heading hierarchy
- Color contrast compliance
- Touch-friendly buttons (min 44px)

---

## Browser Support

### Modern Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (latest)

### Features Used
- ES6+ JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties
- Async/Await
- Fetch API

---

## Package Summary

### Core Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "latest"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^4.0.0",
  "lucide-react": "latest",
  "react-slick": "latest",
  "@radix-ui/*": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Forms
```json
{
  "react-hook-form": "7.55.0"
}
```

### Notifications
```json
{
  "sonner": "2.0.3"
}
```

---

## Project Statistics

- **Total Components:** 30+
- **UI Library Components:** 60+
- **Custom Components:** 13 main sections
- **Lines of Code:** ~5,000+
- **Image Assets:** 20+ optimized images
- **Forms:** 2 (Contact + Enquiry popup)
- **Sections:** 9 (Hero, Projects, About, Location, Awards, Testimonials, CTA, Contact, Footer)

---

## Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.0s
- **Total Blocking Time:** < 200ms
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** 90+ (Desktop), 80+ (Mobile)

---

## License & Attribution

- **React** - MIT License
- **Tailwind CSS** - MIT License
- **Shadcn/ui** - MIT License
- **Lucide Icons** - ISC License
- **Radix UI** - MIT License

All third-party libraries used are open-source with permissive licenses.

---

**Last Updated:** November 3, 2025  
**Version:** 2.0 Production Ready  
**Built for:** Urbanest Realty
