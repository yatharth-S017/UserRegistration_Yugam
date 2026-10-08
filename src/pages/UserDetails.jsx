import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import InputField from "../components/InputField";
import { validateAll } from "../utils/validation";

function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the logged-in user from Firebase
  const currentUser = auth.currentUser;

  // Prefill name and email from Firebase user profile.
  // Password comes from router state — it was passed in-memory from Register.
  const [name, setName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");

  // Per-field validation errors
  const [errors, setErrors] = useState({});

  // Success message shown after all fields pass validation
  const [success, setSuccess] = useState(false);

  // Controls whether the password is visible
  const [showPassword, setShowPassword] = useState(false);

  function handleValidate(e) {
    e.preventDefault();
    setSuccess(false);

    // Run all validations
    const result = validateAll({ name, password, mobile, username, email });
    setErrors(result);

    // If every error string is empty, all fields are valid
    const allValid = Object.values(result).every((err) => err === "");
    if (allValid) {
      setSuccess(true);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    // After logout, redirect to the registration page
    navigate("/register");
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header-row">
          <h1 className="card-title">User Details</h1>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p className="card-subtitle">Review and validate your information</p>

        <form onSubmit={handleValidate} noValidate>
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setSuccess(false); }}
            error={errors.name}
            placeholder="Your full name"
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setSuccess(false); }}
            error={errors.password}
            placeholder="Password"
            rightElement={
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />
          <InputField
            label="Mobile Number"
            type="text"
            value={mobile}
            onChange={(e) => { setMobile(e.target.value); setSuccess(false); }}
            error={errors.mobile}
            placeholder="10-digit mobile number"
          />
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setSuccess(false); }}
            error={errors.username}
            placeholder="e.g. john_doe"
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSuccess(false); }}
            error={errors.email}
            placeholder="you@example.com"
          />

          {/* Success message shown when all fields pass validation */}
          {success && (
            <p className="success-message">✓ All information is valid.</p>
          )}

          <button type="submit" className="btn btn-primary">
            Validate
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
