import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Post request to login API
    try {
      const response = await axios.post("/api/signup", { email, password });

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
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignup}>
        <h2 className="text-xl mb-4">Sign Up</h2>
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
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
