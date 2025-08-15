import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthContext";
import { DoctorsDataContext } from "./store/DoctorsDataContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <DoctorsDataContext>
        <App />
      </DoctorsDataContext>
    </AuthProvider>
  </Router>
);
