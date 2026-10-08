import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import InputField from "../components/InputField";
import { validateName, validateGmailEmail, validatePassword } from "../utils/validation";

// Map Firebase error codes to friendly messages
function getFriendlyError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid Gmail address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function Register() {
  const navigate = useNavigate();

  // Form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inline validation errors
  const [errors, setErrors] = useState({});

  // Firebase / network error message
  const [firebaseError, setFirebaseError] = useState("");

  // Button loading state
  const [loading, setLoading] = useState(false);

  // Controls whether password characters are visible
  const [showPassword, setShowPassword] = useState(false);

  // Validate all three fields using the shared validation functions
  function validate() {
    return {
      name: validateName(name),
      email: validateGmailEmail(email),   // Registration requires Gmail only
      password: validatePassword(password),
    };
  }

  async function handleRegister(e) {
    e.preventDefault();
    setFirebaseError("");

    // Run client-side validation first
    const fieldErrors = validate();
    const hasErrors = Object.values(fieldErrors).some((err) => err !== "");

    if (hasErrors) {
      // Show all errors — do NOT call Firebase
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save the user's display name in their Firebase profile
      await updateProfile(userCredential.user, { displayName: name });

      // Keep password only in memory (router state) for the details page.
      // We do NOT store it in localStorage, sessionStorage, or Firebase.
      navigate("/details", {
        state: { password },
      });
    } catch (err) {
      setFirebaseError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  // Show/Hide button rendered inside the password field
  const showHideToggle = (
    <button
      type="button"                  // Prevents form submission on click
      className="eye-toggle"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">User Registration</h1>
        <p className="card-subtitle">Create your account</p>

        <form onSubmit={handleRegister} noValidate>
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="Your full name"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@gmail.com"
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="At least one letter and one number"
            rightElement={showHideToggle}
          />

          {/* Firebase-level error */}
          {firebaseError && (
            <p className="firebase-error">{firebaseError}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
