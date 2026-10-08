import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / and /register both go to the Registration page */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />

        {/* /details is protected — unauthenticated users are redirected */}
        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown routes to register */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
