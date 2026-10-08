// Validation rules and functions for all form fields
// validateGmailEmail  — used on the Registration page (Gmail only)
// validateEmail       — used on the Details page (any valid email format)

// Only letters and spaces — no numbers or special characters
export function validateName(value) {
  if (!value.trim()) return "Name is required.";
  if (!/^[A-Za-z ]+$/.test(value))
    return "Name can contain only letters and spaces.";
  return "";
}

// At least one letter and one number
export function validatePassword(value) {
  if (!value) return "Password is required.";
  if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(value))
    return "Password must contain at least one letter and one number.";
  return "";
}

// Exactly 10 digits
export function validateMobile(value) {
  if (!value.trim()) return "Mobile number is required.";
  if (!/^\d{10}$/.test(value))
    return "Mobile number must contain exactly 10 digits.";
  return "";
}

// Letters and numbers, with at most ONE special character from: _ - . @
export function validateUsername(value) {
  if (!value.trim()) return "Username is required.";

  // Count how many special characters are present
  const specialChars = value.match(/[_\-.@]/g) || [];
  if (specialChars.length > 1)
    return "Username can contain letters, numbers and at most one special character.";

  // Allow only letters, numbers, and the listed special characters
  if (!/^[A-Za-z0-9_\-.@]+$/.test(value))
    return "Username can contain letters, numbers and at most one special character.";

  return "";
}

// Gmail-only email check — used on the Registration page
export function validateGmailEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@gmail\.com$/.test(value))
    return "Please enter a valid Gmail address.";
  return "";
}

// Generic email format check — used on the Details/Validation page
export function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address.";
  return "";
}

// Validate all fields at once; returns an object with one key per field
export function validateAll({ name, password, mobile, username, email }) {
  return {
    name: validateName(name),
    password: validatePassword(password),
    mobile: validateMobile(mobile),
    username: validateUsername(username),
    email: validateEmail(email),
  };
}
