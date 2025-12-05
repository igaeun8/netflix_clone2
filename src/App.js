import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={ROUTES.POPULAR} element={<Popular />} />
        <Route path={ROUTES.SEARCH} element={<Search />} />
        <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
