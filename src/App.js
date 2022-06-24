import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomeContent from './components/HomeContent'

export default function App(){
    return (
    <div className="app">
        <div className="margin">
            <Navbar />
            <HomeContent />
        </div>
        <Footer />
    </div>
    )
}