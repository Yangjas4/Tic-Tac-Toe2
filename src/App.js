import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//aoisdjaoidsjio
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeContent from './pages/HomeContent';

export default function App(){
    return (
    <Router>
        <div className="app">
            <div className="margin">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomeContent />}/>
                </Routes>
            </div>
            <Footer />
        </div>
    </Router>
    )
}