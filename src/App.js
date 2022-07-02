import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

//aoisdjaoidsjio


export default function App(){
    return (
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/singleplayer" element="" />
        </Routes>
    </Router>
    )
}