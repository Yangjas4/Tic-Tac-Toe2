import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gamemulti from '../components/Gamesingle';

export default function Singleplayer() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="multi"/>
                <Gamemulti />
            </div>
            <Footer />
        </div>
    )
}