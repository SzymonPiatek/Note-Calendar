import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Navbar } from "./sections/Navbar";
import { LoginPage } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./routes/PrivateRoute";

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

          {/* Logged in user */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
