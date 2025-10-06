// Email validation utilities
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateEmail = (
  email: string
): { valid: boolean; message?: string } => {
  if (!email) {
    return { valid: true }; // Email is optional
  }

  if (email.length > 254) {
    return { valid: false, message: "Email address is too long" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: "Please enter a valid email address" };
  }

  // Additional checks for common issues
  if (email.includes("..")) {
    return {
      valid: false,
      message: "Email address cannot contain consecutive dots",
    };
  }

  if (email.startsWith(".") || email.endsWith(".")) {
    return {
      valid: false,
      message: "Email address cannot start or end with a dot",
    };
  }

  return { valid: true };
};

// React Hook Form validation rules
export const emailValidationRules = {
  pattern: {
    value: EMAIL_REGEX,
    message: "Please enter a valid email address",
  },
  maxLength: {
    value: 254,
    message: "Email address is too long",
  },
  validate: (value: string | undefined) => {
    if (!value) return true; // Optional field
    const validation = validateEmail(value);
    return validation.valid || validation.message;
  },
};
