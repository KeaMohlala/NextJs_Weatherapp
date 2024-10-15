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
    <div className="App bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex flex-col items-center">
      <nav className="w-full p-4 bg-white shadow-md flex justify-between items-center">
        {/* Left Section for Weather App Title */}
        <div className="text-2xl text-gray-700 font-bold font-sans">
          Weather App
        </div>

        {/* Right Section for Login/Sign Up or Logout Buttons */}
        <div className="flex space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="font-sans font-bold  text-gray-600 px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="font-sans font-bold ml-2  text-gray-600 px-4 py-2"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border-4 border-red-200 rounded text-gray-600 px-4 py-2 font-sans font-bold "
            >
              Logout
            </button>
          )}
        </div>
      </nav>

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
