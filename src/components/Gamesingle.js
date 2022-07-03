import React from 'react';


export default function Gamesingle() {


    
    return (
        <div className="game-single">
            <h1 className="game-title">
                {">"} TIC_TAC_TOE <br/>SINGLEPLAYER
            </h1>
            <button className="start-game">START GAME</button>
            <h3 className="rules">Rules</h3>
            <div className="rules-text">
                <p className="rules-p">Rules: In this game, you will take turns placing symbols on a 3 by 3 grid. When a player connects 3 of their symbols in any horizontal, vertical or diagonal line they will win the round. Play continuosly against the CPU until you lose or draw. Players with the highest winstreaks will be featured on the leaderboards! GLHF!</p>
            </div>
        </div>
    )
}