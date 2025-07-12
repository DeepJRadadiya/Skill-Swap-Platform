import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// User Pages
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Dashboard from './pages/user/Dashboard';
import BrowseSkills from './pages/user/BrowseSkills';
import SwapRequests from './pages/user/SwapRequests';
import Feedback from './pages/user/Feedback';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Landing Page
import Home from './pages/Home';


import { useAuthUser } from './hooks/useAuthUser';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { isLoading, authUser } = useAuthUser();

  console.log("authUser",authUser)


  // Mock authentication check
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAdmin(savedIsAdmin === 'true');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={currentUser && !isAdmin ? <Dashboard currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/browse" element={currentUser && !isAdmin ? <BrowseSkills currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/swaps" element={currentUser && !isAdmin ? <SwapRequests currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/feedback" element={currentUser && !isAdmin ? <Feedback currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={currentUser && !isAdmin ? <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />} />
            <Route path="/admin/dashboard" element={currentUser && isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;