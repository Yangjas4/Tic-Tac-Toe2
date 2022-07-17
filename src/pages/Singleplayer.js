import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GamesingleStart from '../components/GamesingleStart';
import Spotify from '../components/Spotify';
import Gamesingle from '../components/Gamesingle';

export default function Singleplayer() {

    const [gameState, setGameState] = useState("startGame");
    console.log(gameState)

    function startGame() {
        setGameState("playingGame");
        console.log(gameState);
    }


    return (
        <div className="app">
            <div className="margin">
                <Navbar page="single" />
                {gameState === "startGame" && <GamesingleStart playgame={startGame} />}
                {gameState === "playingGame" && <Gamesingle />}
                {/* <Spotify /> */}
            </div>
            <Footer />
        </div>
    )
}