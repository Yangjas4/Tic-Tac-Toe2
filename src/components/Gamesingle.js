import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Square from './Square';

const topDown = {
    hidden: {
        opacity: 0,
        y: -100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2,
        }
    }
}
const bottomUp = {
    hidden: {
        opacity: 0,
        y: 200
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 2,
        }
    }
}
const fadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}

export default function Gamesingle() {
    const initSquares = [
        {
            id: 0,
            gameState: ""
        },
        {
            id: 1,
            gameState: ""
        },
        {
            id: 2,
            gameState: ""
        },
        {
            id: 3,
            gameState: ""
        },
        {
            id: 4,
            gameState: ""
        },
        {
            id: 5,
            gameState: ""
        },
        {
            id: 6,
            gameState: ""
        },
        {
            id: 7,
            gameState: ""
        },
        {
            id: 8,
            gameState: ""
        }]
    const [squaresArray, setSquaresArray] = useState(initSquares);
    const squareElements = squaresArray.map(square => <Square id={square.id} gameState={square.gameState} key={square.id} toggleSquare={toggleSquare} />);
    const [playerPieces, setPlayerPieces] = useState(randomizePlayer());
    const [playerTurn, setPlayerTurn] = useState(playerPieces.player === "x");
    const [gameOver, setGameOver] = useState(false);
    const [winstreak, setWinstreak] = useState(0);

    function randomizePlayer() {
        const player = Math.floor(Math.random() * 2);
        if (player === 0) {
            return {
                player: "o",
                cpu: "x"
            }
        } else {
            return {
                player: "x",
                cpu: "o"
            }
        }
    }

    function toggleSquare(id) {
        if (playerTurn) {
            setSquaresArray(prevSquares => {
                return prevSquares.map((square) => {
                    return square.id === id ? { ...square, gameState: playerPieces.player } : square
                })
            })
        } else {
            return
        }
        setPlayerTurn(prevPlayerTurn => !prevPlayerTurn)
        console.log(playerTurn)
    }

    setTimeout(() => {if (!playerTurn) {
        let cpuMove = 0;
        do {
            cpuMove = Math.floor(Math.random() * 9)
        } while (squaresArray[cpuMove].gameState != "")
        setSquaresArray(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === cpuMove ? { ...square, gameState: playerPieces.cpu } : square
            })
        })
        setPlayerTurn(prevPlayerTurn => !prevPlayerTurn)
        console.log(playerTurn)
    }}, 3000)

    function checkWin() {

    }

    console.log(squaresArray)
    console.log(playerPieces)
    return (
        <div className="actual-game-single">
            <h1 className="winstreak-counter" onClick={toggleSquare} ><span className="bold">Your</span> Winstreak: {winstreak}</h1>
            <motion.svg className="gameboard" width="390" height="373" viewBox="0 0 390 373" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect variants={topDown} initial="hidden" animate="visible" x="123" width="11" height="373" fill="#492CFF" />
                <motion.rect variants={bottomUp} initial="hidden" animate="visible" x="257" width="11" height="373" fill="#492CFF" />
                <motion.rect variants={fadeIn} initial="hidden" animate="visible" x="390" y="237" width="11" height="390" transform="rotate(90 384 237)" fill="#492CFF" />
                <motion.rect variants={fadeIn} initial="hidden" animate="visible" x="390" y="107" width="11" height="390" transform="rotate(90 390 107)" fill="#492CFF" />
            </motion.svg>
            <div className="squares">
                {squareElements}
            </div>
        </div>
    )
}