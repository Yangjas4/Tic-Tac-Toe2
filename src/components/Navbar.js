import React from 'react'
import WebLogo from '../images/Logo.svg'

export default function Navbar(props) {
    const 

    return (
        <nav>
            <img src={WebLogo} alt="tic tac toe by Jason Yang logo"></img>
            <ul>
                <li className={}>Singleplayer</li>
                <li className="">Multiplayer</li>
                <li className="">Leaderboards</li>
            </ul>
            <div className="weather-button">Weather</div>
        </nav>
    )
}