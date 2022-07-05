import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Singleplayer from './pages/Singleplayer';
import Multiplayer from './pages/Multiplayer';
//aoisdjaoidsjio


export default function App(){
    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/singleplayer" element={<Singleplayer />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
    </Router>
    )
}