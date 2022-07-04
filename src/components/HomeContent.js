import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeContent() {
    return (
        <main>
            <div className="cta">
                <h1> {">"} WELCOME TO<br /><span className="blue">TIC_TAC_TOE</span></h1>
                <p>A fork of my intro to computer science project made for the EECS 1012 course at York University which was also 
                    the first project I'd ever made. I decided to rebuild as well as redesign
                    the entire project using a react frontend and firebase backend. To the right you can find the original project's video demo 
                    as a point of comparison. You can alsp find the open source code on github at
                    <br /><a href="https://github.com/Yangjas4/Tic-Tac-Toe2">{" "}https://github.com/Yangjas4/Tic-Tac-Toe2.</a></p>
                <div className="play-container">
                    <div className="play-button"><Link to="/singleplayer">PLAY NOW</Link></div>
                </div>
            </div>
            <div className="showcase-video">
                <iframe title="original tictactoe project video demo" src="https://www.youtube.com/embed/kRRWYumBHJA" allowFullScreen>
                    <source />
                    No video available
                </iframe>
            </div>
        </main>
    )
}