import React from 'react'
import WebLogo from '../images/Logo.svg'

export default function Navbar() {
    return (
        <nav>
            <img src={WebLogo} alt="tic tac toe by Jason Yang logo"></img>
            <ul>
                <li>Singleplayer</li>
                <li>Multiplayer</li>
                <li>Leaderboards</li>
            </ul>
            <div className="weather-button">Weather</div>
        </nav>
    )
}