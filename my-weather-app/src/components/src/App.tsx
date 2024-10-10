//import "./App.css";
//import "./index.css";
import Weather from "./weather";

export default function App() {
  return (
    <div className="App bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <Weather defaultCity="Johannesburg" />
      <small className="text-gray-600 mt-4">
        <a
          href="https://github.com/KeaMohlala/react-weatherapp.git"
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
