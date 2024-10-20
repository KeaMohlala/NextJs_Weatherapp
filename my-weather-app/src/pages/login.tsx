//Frontend pags for user login=5h.
//Interacts with the corresponding API route to authenticate users.

import React, { useState } from "react";
import { useRouter } from "next/router"; //allows navigation between pages programmatically.
import axios from "axios"; //a library for making HTTP requests.

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Post request to login API
    try {
      const response = await axios.post("/api/login", { email, password });

      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to the weather app after login
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans bg-gradient-to-br from-purple-100 to-blue-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full p-2 mb-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full p-2 mb-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full border-4 border-blue-100 text-gray-600 p-2 rounded  hover:bg-blue-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
