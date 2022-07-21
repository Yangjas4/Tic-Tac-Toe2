import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Leaderboard() {
    return (
        <div className="app">
            <div className="margin">
                <Navbar page="leaderboards" />
                <div className="leaderboard-main">
                    <h1 className="congrats">CONGRATS</h1>
                    <div className="leaderboards-second-row">
                        <h2 className="congrats-subheading">TO OUR TOP PLAYERS</h2>
                        <div className="leaderboard-body">
                            <h3 className="leaderboard-title">Winstreak High Scores</h3>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    )
}