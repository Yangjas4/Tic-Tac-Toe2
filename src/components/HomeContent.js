import React from 'react'


export default function HomeContent() {
    return (
        <main>
            <div className="cta">
                <h1> {">"} WELCOME TO<br /><span className="blue">TIC_TAC_TOE</span></h1>
                <p>A fork of my intro to computer science project made for the EECS 1012 course at York University. This project has been
                    rebuilt using a react frontend and node express mongodb backend.
                    This project is now open source and can be found at
                    <br /><a href="https://github.com/Yangjas4/Tic-Tac-Toe">{" "}https://github.com/Yangjas4/Tic-Tac-Toe.</a></p>
                <div className="play-container">
                    <div className="play-button">PLAY NOW</div>
                </div>
            </div>
            <div className="showcase-video">
                <iframe src="https://www.youtube.com/embed/kRRWYumBHJA" allowFullScreen>
                    <source />
                    No video available
                </iframe>
            </div>
        </main>
    )
}