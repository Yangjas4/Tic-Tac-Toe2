import React from 'react'
import WebLogo from '../images/Logo.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar(props) {

    return (
        <nav>
            <Link to="/" className="nav-logo"><img src={WebLogo} alt="tic tac toe by Jason Yang logo"></img></Link>
            <ul>
                <Link to="/singleplayer" className={props.page === "single" ? "nav-underline" : "logo-pos-fix"}>Singleplayer</Link>
                <Link to="/multiplayer" className={props.page === "multi" ? "nav-underline" : ""}>Multiplayer</Link>
                <Link to="/leaderboards" className={props.page === "leaderboards" ? "nav-underline" : ""}>Leaderboards</Link>
            </ul>
            <motion.div
                whileHover={{ scale: 1.2 }}
                className="weather-button"
            >
                Weather
            </motion.div>
        </nav>
    )
}