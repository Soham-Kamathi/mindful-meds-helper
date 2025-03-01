
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import MedicationTracker from './pages/MedicationTracker';
import Notifications from './pages/Notifications';
import AddMedication from './pages/AddMedication';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medication-tracker" element={<MedicationTracker />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
