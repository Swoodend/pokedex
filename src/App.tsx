import * as React from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Favourites from './pages/Favourites/Favourites';
import Showcase from './pages/Showcase/Showcase';

function App() {
    const [params,] = useSearchParams();
    const search = params.get('search');

    return (
        <Routes>
            <Route path="/" element={search ? <Showcase search={search} /> : <Home />} />
            <Route path="favourites" element={<Favourites />} />
        </Routes>
    );
}

export default App;
