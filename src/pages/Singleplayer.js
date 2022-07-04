import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamesingleStart from '../components/GamesingleStart';
import Spotify from '../components/Spotify';

export default function Singleplayer() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="single"/>
                <GamesingleStart />
                {/* <Spotify /> */}
            </div>
            <Footer />
        </div>
    )
}