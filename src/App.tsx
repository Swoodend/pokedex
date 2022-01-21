import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="favourites" element={<Favourites />}/>
    </Routes>
  );
}

export default App;
