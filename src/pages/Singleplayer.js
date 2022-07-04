import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gamesingle from '../components/Gamesingle';
import Spotify from '../components/Spotify';

export default function Singleplayer() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="single"/>
                <Gamesingle />
                <Spotify />
            </div>
            <Footer />
        </div>
    )
}