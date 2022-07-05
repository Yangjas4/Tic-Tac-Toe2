import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamemultiStart from '../components/GamemultiStart';
import Spotify from '../components/Spotify';

export default function Singleplayer() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="multi"/>
                <GamemultiStart />
                {/* <Spotify /> */}
            </div>
            <Footer />
        </div>
    )
}