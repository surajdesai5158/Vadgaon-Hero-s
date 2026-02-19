import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import About from "./components/guestLayout/About";

import Festivel from "./components/guestLayout/Festivel";


import AdminLayout from "./components/adminLayout/AdminLayout";
import Cricket from "./components/guestLayout/Cricket";
import AdminCricket from "./components/adminLayout/AdminCricket";
import GuestOneLayout from "./components/guestOne/GuestOneLayout";
import GuestOneRegister from "./components/guestOne/GuestOneRegister";
import GuestOneLogin from "./components/guestOne/GuestOneLogin";

import GuestContact from "./components/guestOne/GuestContact";
import AdminContact from "./components/adminLayout/AdminContact";
import AdminFestival from "./components/adminLayout/AdminFestival";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminTemple from "./components/adminLayout/AdminTemple";
import Temple from "./components/guestLayout/Temples";
import AdminAbout from "./components/adminLayout/AdminAbout";
import AdminUsers from "./components/adminLayout/AdminUsers";
import Profile from "./components/guestLayout/Profile";


function App() {
  // 🔥 IMPORTANT: match state
  const [match, setMatch] = useState(null);

  return (
    
      <Routes>
      
    <Route path="/" element={<GuestOneLayout />}>
  
        <Route index element={<GuestOneRegister />} />
        <Route path="/register" element={<GuestOneRegister />} />
        <Route path="/login" element={<GuestOneLogin />} />
        <Route path="/contact" element={<GuestContact />} />
   </Route>

        {/* ---------- GUEST / USER ---------- */}
      

        <Route path="/user" element={
            <ProtectedRoute role="user">
              
              <GuestLayout />
            </ProtectedRoute>

          }>
          <Route index element={<Home />} />
          <Route path="/user/home" element={
              <Home />
            } />
          <Route path="/user/about" element={
                <About />
            } />

          {/* 👤 USER क्रिकेट – फक्त score */}
         
          <Route path="/user/cricket" element={<Cricket match={match} />}/>
          <Route path="/user/festivel" element={<Festivel />} />
          <Route path="/user/temples" element={<Temple />} />
          <Route path="/user/contact" element={<GuestContact />} />
          <Route path="/user/profile" element={<Profile />} />

        </Route>
        

        {/* ---------- ADMIN ---------- */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">

            <AdminLayout />
          </ProtectedRoute>
          
          
          }>
          <Route index element={<Home />} />
          <Route path="/admin/home" element={<Home />} />
                <Route
          path="/admin/cricket"
          element={<AdminCricket setMatch={setMatch} />}
        />
                <Route
          path="/admin/contact"
          element={<AdminContact/>}
        />
                <Route
          path="/admin/temple"
          element={<AdminTemple/>}
        />
                <Route
          path="/admin/festival"
          element={<AdminFestival/>}
        />
                <Route
          path="/admin/about"
          element={<AdminAbout/>}
        />
                <Route
          path="/admin/users"
          element={<AdminUsers/>}
        />

          {/* 🧑‍💼 ADMIN क्रिकेट – score update */}
        
        </Route>

      </Routes>
 
  );
}

export default App;
