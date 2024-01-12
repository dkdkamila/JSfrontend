import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

      <Switch>
        <Route exact path="/blogg">
          <ClientPage />
        </Route>

        <Route exact path="/admin">
          <AdminPage />
        </Route>

      </Switch>

      <Footer />
    </Router>
  );
}

export default App;



