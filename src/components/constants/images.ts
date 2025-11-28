import image_cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6 from "figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png";
import image_5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4 from "figma:asset/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png";
import nagendraImage from "figma:asset/b5fa201d71345eb914606ab574ca22d67a72b3ad.png";
import aboutCityscapeImage from "figma:asset/be94c795e47e163b36f54ba54c2c113c526f6ff7.png";
import aboutVisionImage from "figma:asset/f16eef0e0e528b1962c0c1ddc5df66168c443641.png";
import aboutMissionImage from "figma:asset/20a4b296375d7afd4769e114f8a0d90e5f615fd3.png";
import manishImage from "figma:asset/4f91cbb0b0e9249ab48623392782fe2e6bc168a2.png";
import mohanImage from "figma:asset/bdfdca5e8aad2eb5af6b4d53ea9f269eb3174fad.png";
import mehaboobImage from "figma:asset/427333929426c2690fc4a7b05bb2728c71b5b4ab.png";
import heroBackgroundImage from "figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png";
// Centralized image configuration for Urbanest Realty
// Update file names here to change images throughout the application
//
// IMAGE MANAGEMENT GUIDE:
// 1. For stock photos: Use unsplash_tool to get high-quality URLs
// 2. For your own images: Host them externally (e.g., Cloudinary, ImageKit, etc.) and use those URLs
// 3. For small logos/icons: Use data URLs or external hosting
// 4. Replace any URL below with your actual hosted image URLs

// Hero Section Images
export const HERO_IMAGES = {
  // Your uploaded hero background image - stunning apartment towers
  background: heroBackgroundImage,
  // Placeholder for Eastfield logo - using a neutral placeholder
  eastfieldLogo:
    "https://images.unsplash.com/photo-1744424777899-36114c689125?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXN0ZmllbGQlMjByZWFsdHklMjBsb2dvfGVufDF8fHx8MTc1ODI5MTE2OHww&ixlib=rb-4.1.0&q=80&w=400",
} as const;

// Project Images
export const PROJECT_IMAGES = {
  // Replace with your actual project images URLs
  eastfield: image_5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4,
  elite:
    "figma:asset/c448b27b0a7e484978529def6d6f246f89740e41.png", // Your actual Elite-35 building image
  serene: image_cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6,
} as const;

// Team Member Images
export const TEAM_IMAGES = {
  // Replace with your actual team member photos URLs
  manish: manishImage, // Your uploaded professional image - Manish Batra (Strategy Partner)
  mehaboob: mehaboobImage, // Your uploaded image - Shaik Mehaboob Basha (Partner)
  mohan: mohanImage, // Your uploaded image - Mohan R (Managing Partner)
  nagendra: nagendraImage, // Nagendra K - Sales Director - Direct imported image
  placeholder: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc1OTg0NjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080", // Placeholder for 5th team member
} as const;

// Award Images - YOUR ACTUAL AWARD CEREMONY PHOTOS
export const AWARD_IMAGES = {
  // Updated to use actual award ceremony photos
  award1: "figma:asset/c1aa3e3e3d5b0fb6a1c4e8fda42a81758417d8fb.png", // Times Business Awards ceremony - your uploaded image
  award2: "figma:asset/af4ae3fabe9ee4219ef0a512eeb0af1bbc517f15.png", // ET Business Awards ceremony  
  award3: "figma:asset/ea56de334c0a27c73b4a70fbc3cd8c9e5cc7f7ce.png", // Property Awards ceremony
} as const;

// About Us Section Images
export const ABOUT_IMAGES = {
  vision: aboutVisionImage, // Your uploaded vision image - hand holding compass with buildings
  mission: aboutMissionImage, // Your uploaded mission image - compass on map
  cityscape: aboutCityscapeImage, // Your uploaded apartment towers image
} as const;

// Testimonial Images
export const TESTIMONIAL_IMAGES = {
  client1:
    "https://images.unsplash.com/photo-1642337707259-0fdcc8fd06f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwdGVzdGltb25pYWx8ZW58MXx8fHwxNzU4MjA0MTU2fDA&ixlib=rb-4.1.0&q=80&w=400",
  client2:
    "https://images.unsplash.com/photo-1703759354716-b777fd195508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRpc2ZpZWQlMjBjbGllbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyOTA3MDF8MA&ixlib=rb-4.1.0&q=80&w=400",
  client3:
    "https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHJldmlldyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODI5MDcwNnww&ixlib=rb-4.1.0&q=80&w=400",
} as const;

// Location Images (these will need to be added when Location section is implemented)
export const LOCATION_IMAGES = {
  map: "https://images.unsplash.com/photo-1626239830052-c0cc5bcd9d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBsb2NhdGlvbiUyMGd1aWRlfGVufDF8fHx8MTc1ODI5MDcxNHww&ixlib=rb-4.1.0&q=80&w=800",
  neighborhood:
    "https://images.unsplash.com/photo-1721667325419-9b51a2f38c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBhcmVhJTIwdmlld3xlbnwxfHx8fDE3NTgyOTA3MTh8MA&ixlib=rb-4.1.0&q=80&w=800",
} as const;

// All images combined for easy access
export const ALL_IMAGES = {
  hero: HERO_IMAGES,
  projects: PROJECT_IMAGES,
  team: TEAM_IMAGES,
  awards: AWARD_IMAGES,
  about: ABOUT_IMAGES,
  testimonials: TESTIMONIAL_IMAGES,
  location: LOCATION_IMAGES,
} as const;