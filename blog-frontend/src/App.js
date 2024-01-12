import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Navigation from './components/Navigation.js';
import ClientPage from './pages/ClientPage.js';
import AdminPage from './pages/AdminPage.js';


function App() {

  return (
    <Router>
      <Header />
      <Navigation />

      <Routes>
        <Route path="/" element={<ClientPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>


      <Footer />
    </Router>
  );
}

export default App;



