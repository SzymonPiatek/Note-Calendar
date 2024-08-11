import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Navbar } from "./sections/Navbar";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const user = false;

  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <LoginPage />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
