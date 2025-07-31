import React, { useState, useEffect } from "react";
import logo from "../../public/assets/Logo.png";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      if (onLogin) onLogin();
    }
    setLoading(false);
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    if (email && password) {
      // Simulate successful login
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      if (onLogin) onLogin();
    } else {
      alert("Please enter email and password");
    }
  };

  if (loading) {
    return null; // Prevent flicker by not rendering until login status is checked
  }
  if (isLoggedIn) {
    // Optionally, you can redirect or render a different component here
    return null; // Already logged in, don't show login form
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-brand">
      <div className="bg-gray-50 shadow-lg rounded-4xl p-8 w-full max-w-md flex flex-col items-center">
        <img src={logo} alt="Evenlyo Logo" className="h-16 mb-10" />
        <h2 className="text-2xl font-bold mb-10 text-gradient">Admin Login</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  bg-gradient-brand text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
