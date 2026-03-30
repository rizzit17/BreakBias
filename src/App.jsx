import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';

// Pages
import Landing from './pages/Landing';
import ModeSelect from './pages/ModeSelect';
import Login from './pages/user/Login';
import UserSetup from './pages/user/UserSetup';
import Intro from './pages/Intro';
import RoleSelect from './pages/RoleSelect';
import Dashboard from './pages/Dashboard';
import Scenario from './pages/Scenario';
import Summary from './pages/Summary';
import Comparison from './pages/Comparison';
import Intervention from './pages/Intervention';
import Reflection from './pages/Reflection';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/mode-select" element={<ModeSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={<UserSetup />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scenario/:index" element={<Scenario />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/intervention" element={<Intervention />} />
        <Route path="/reflection" element={<Reflection />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-dark">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
