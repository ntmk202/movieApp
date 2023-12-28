export const validateEmail = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

export const validatePassword = (text: string): boolean => {
  return text.length >= 6;
};

export const validateUsername = (text: string): boolean => {
  return text.trim() !== '';
};

export const validatePhoneNumber = (text: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(text);
};

export const validateDateOfBirth = (text: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(text);
};

export const validateAddress = (text: string): boolean => {
  return text.trim().length > 0;
};
