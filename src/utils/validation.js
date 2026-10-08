// Validation rules and functions for all form fields
// validateEmail — used on BOTH the Registration page and the Details page (Gmail only)

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

// Letters and/or numbers, with at most ONE special character of any kind.
// Spaces are not allowed. The username must have at least one letter or digit.
export function validateUsername(value) {
  if (!value.trim()) return "Username is required.";

  // Reject spaces anywhere in the username
  if (/\s/.test(value))
    return "Username can contain letters, numbers, and at most one special character.";

  // Count characters that are NOT a letter or digit — these are special characters
  const specialChars = value.match(/[^A-Za-z0-9]/g) || [];
  if (specialChars.length > 1)
    return "Username can contain letters, numbers, and at most one special character.";

  // Must contain at least one letter or number (e.g. reject "@" or "!" alone)
  if (!/[A-Za-z0-9]/.test(value))
    return "Username can contain letters, numbers, and at most one special character.";

  return "";
}

// Gmail-only email check — used on both the Registration and Details pages.
// Case-insensitive so "ABC@GMAIL.COM" is also accepted.
export function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@gmail\.com$/i.test(value))
    return "Please enter a valid Gmail address.";
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
