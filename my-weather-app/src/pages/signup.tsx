//Frontend pages for user signup.
//Interacts with the corresponding API route to authenticate users.

import { useState } from "react";
import { useRouter } from "next/router"; //allows navigation between pages programmatically.
import axios from "axios"; //a library for making HTTP requests.

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to the weather app after signup
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-sans bg-gradient-to-br from-purple-100 to-blue-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <input
          className="block w-full p-2 mb-2 border rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full p-2 mb-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full border-4 border-purple-100 text-gray-600 p-2 rounded  hover:bg-purple-200">
          Sign Up
        </button>
      </form>
    </div>
  );
}
