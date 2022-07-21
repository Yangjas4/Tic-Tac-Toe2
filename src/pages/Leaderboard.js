import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeaderboardName from '../components/LeaderboardName';
import colRef from '../firebase';
import { getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../images/201-simple-loader.json'

export default function Leaderboard() {

    let leaderboardData;
    const [leaderboardElements, setLeaderboardElements] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);

    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                leaderboardData = snapshot.docs.map(doc => {
                    return {
                        ...doc.data()
                    }
                })
                const sortedLeaderboardData = leaderboardData.sort((a, b) => b.winstreak - a.winstreak);
                sortedLeaderboardData.splice(10);
                setLeaderboardElements(sortedLeaderboardData.map((player, index) => <LeaderboardName key={index} name={player.name} score={player.winstreak} rank={index + 1} />))
                setFinishedLoading(true);
            })
            .catch(err => {
                console.log(`%cError: ${err.message}`, "color:red");
            })
    }, [])



    return (
        <div className="app">
            <div className="margin">
                <Navbar page="leaderboards" />
                {finishedLoading ?
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leaderboard-container">
                        <div className="leaderboard-main">
                            <h1 className="congrats">CONGRATS</h1>
                            <div className="leaderboards-second-row">
                                <h2 className="congrats-subheading">TO OUR TOP PLAYERS</h2>
                                <div className="leaderboard-body">
                                    <h3 className="leaderboard-title">Winstreak High Scores</h3>
                                    <table className='leaderboard-table'>
                                        <thead>
                                            <tr>
                                                <th>Rank</th>
                                                <th>Name</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaderboardElements}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </motion.div> :
                    <div className="loading">
                        <Lottie animationData={animationData} loop={true} />
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}