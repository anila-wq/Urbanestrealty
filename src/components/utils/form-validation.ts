export interface FormData {
  name: string;
  number: string;
  email: string;
  project?: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (number: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]{10,}$/;
  return phoneRegex.test(number);
};

export const validateFormData = (formData: FormData): string | null => {
  if (!formData.name || !formData.number || !formData.email || !formData.project) {
    return 'Please fill in all fields';
  }

  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }

  if (!validatePhoneNumber(formData.number)) {
    return 'Please enter a valid phone number';
  }

  return null;
};