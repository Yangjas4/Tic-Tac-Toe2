import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomeContent from '../components/HomeContent';

export default function Homepage() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="home" />
                <HomeContent />
            </div>
            <Footer />
        </div>
    )
}