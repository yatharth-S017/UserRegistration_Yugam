import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

/**
 * Wraps a route so only authenticated users can access it.
 * While the auth state is loading, shows a simple loading text.
 * If not authenticated, redirects to /register.
 */
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // null if logged out, user object if logged in
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Still determining auth state — show nothing meaningful yet
  if (user === undefined) {
    return <p className="loading-text">Loading...</p>;
  }

  // Not authenticated — redirect to register
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // Authenticated — render the protected page
  return children;
}

export default ProtectedRoute;
