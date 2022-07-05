import React, { useState} from 'react';

export default function GamesingleStart() {
    const [showRules, setShowRules] = useState(false);
    
    function toggleRules() {
        setShowRules(prevShowRules => !prevShowRules);
    }

    return (
        <div className="game-single-start">
            <h1 className="game-title">
                {">"} TIC_TAC_TOE <br/><span className="blueNoTyping">MULTIPLAYER</span>
            </h1>
            <div className="start-game">START GAME</div>
            <h3 className="rules" onClick={toggleRules}>Rules</h3>
            {showRules && <div className="rules-text">
                <p className="rules-p"><span className="bold">Rules:</span> In this game, you will take turns placing symbols on a 3 by 3 grid. When a player connects 3 of their symbols in any horizontal, vertical or diagonal line they will win the round. Play continuosly against the CPU until you lose or draw. Players with the highest winstreaks will be featured on the leaderboards! GLHF!</p>
            </div>}
        </div>
    )
}