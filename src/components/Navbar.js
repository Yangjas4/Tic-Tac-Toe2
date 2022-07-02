import React from 'react'
import WebLogo from '../images/Logo.svg'


export default function Navbar(props) {

    return (
        <nav>
            <img src={WebLogo} alt="tic tac toe by Jason Yang logo"></img>
            <ul>
                <li className={props.page === "single" ? "nav-underline" : ""}>Singleplayer</li>
                <li className={props.page === "multi" ? "nav-underline" : ""}>Multiplayer</li>
                <li className={props.page === "leaderboards" ? "nav-underline" : ""}>Leaderboards</li>
            </ul>
            <div className="weather-button">Weather</div>
        </nav>
    )
}