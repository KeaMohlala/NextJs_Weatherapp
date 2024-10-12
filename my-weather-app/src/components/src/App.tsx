//import "./App.css";
//import "./index.css";
import Weather from "./weather";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="App bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      {!token ? (
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <Weather defaultCity="Johannesburg" />
      <small className="text-gray-600 mt-4">
        <a
          href="https://github.com/KeaMohlala/NextJs_Weatherapp"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Open-source code
        </a>
        , by Keamogetse Mohlala
      </small>
    </div>
  );
}
