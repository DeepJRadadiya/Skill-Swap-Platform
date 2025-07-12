import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
const App = () => {
  return (
    <div>
      <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin} /> */}
        
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />} />
            
            <Route path="/dashboard" element={currentUser && !isAdmin ? <Dashboard currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/browse" element={currentUser && !isAdmin ? <BrowseSkills currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/swaps" element={currentUser && !isAdmin ? <SwapRequests currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/feedback" element={currentUser && !isAdmin ? <Feedback currentUser={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={currentUser && !isAdmin ? <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} /> */}
            
            {/* Admin Routes */}
            {/* <Route path="/admin/login" element={<AdminLogin setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />} />
            <Route path="/admin/dashboard" element={currentUser && isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} /> */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>

    </div>
  )
}

export default App
