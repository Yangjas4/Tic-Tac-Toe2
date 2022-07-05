import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GamesingleStart(props) {

    const [showRules, setShowRules] = useState(false);
    
    function toggleRules() {
        setShowRules(prevShowRules => !prevShowRules);
    }

    return (
        <div className="game-single-start">
            <h1 className="game-title">
                {">"} TIC_TAC_TOE <br/><span className="blueNoTyping">SINGLEPLAYER</span>
            </h1>
            <div className="start-game" onClick={props.playgame}>START GAME</div>
            <h3 className="rules" onClick={toggleRules}>Rules</h3>
            <AnimatePresence>
                {showRules && 
                <motion.div 
                    exit={{opacity: 0}}
                    className="rules-text">
                    <motion.p 
                        initial={{opacity: 0}}
                        animate={{ opacity: 1}}
                        whileHover={{scale: 1.3}}
                        className="rules-p"><span className="bold">Rules (Hover to Zoom in):</span> In this game, you
                    will take turns placing symbols on a 3 by 3 grid. When a player connects 3 of their 
                    symbols in any horizontal, vertical or diagonal line they will win the round. 
                    Play continuosly against the CPU until you lose or draw. Players with the highest 
                    winstreaks will be featured on the leaderboards! GLHF!</motion.p>
                 </motion.div>}
            </AnimatePresence>
        </div>
    )
}