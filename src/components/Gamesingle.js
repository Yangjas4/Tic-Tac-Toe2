import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Square from './Square';
import useSound from 'use-sound';
import playerSfx from '../sounds/abs-confirm-1.mp3';
import cpuSfx from '../sounds/abs-cancel-1.mp3';

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
    const playerConfig = {
        player: "x",
        cpu: "o"
    }
    const [squaresArray, setSquaresArray] = useState(initSquares);
    const squareElements = squaresArray.map(square => <Square id={square.id} gameState={square.gameState} key={square.id} toggleSquare={toggleSquare} />);
    const [playerPieces, setPlayerPieces] = useState(playerConfig);
    const [playerTurn, setPlayerTurn] = useState(playerPieces.player === "x");
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("")
    const [winstreak, setWinstreak] = useState(0);
    const [playerMoveSound] = useSound(playerSfx);
    const [cpuMoveSound] = useSound(cpuSfx);


    function toggleSquare(id) {
        if (playerTurn) {
            setSquaresArray(prevSquares => {
                return prevSquares.map((square) => {
                    return square.id === id ? { ...square, gameState: playerPieces.player } : square
                })
            })
            playerMoveSound();
        } else {
            return
        }
        setPlayerTurn(prevPlayerTurn => !prevPlayerTurn);
        console.log(playerTurn);
        checkWin();
        console.log(`winner: ${winner}`);
    }

    checkWin();
    setTimeout(() => {
        if (!playerTurn) {
            let cpuMove = 0;
            do {
                cpuMove = Math.floor(Math.random() * 9)
            } while (squaresArray[cpuMove].gameState !== "")
            setSquaresArray(prevSquares => {
                return prevSquares.map((square) => {
                    return square.id === cpuMove ? { ...square, gameState: playerPieces.cpu } : square
                })
            })
            cpuMoveSound();
            setPlayerTurn(prevPlayerTurn => !prevPlayerTurn)
            console.log(playerTurn)
            console.log(`winner: ${winner}`);
        }
    }, 3000)

    function checkWin() {
        const wincheckArray = squaresArray.map(square => {
            if (square.gameState === "x") {
                return 1;
            } else if (square.gameState === "o") {
                return -1;
            } else {
                return 0;
            }
        });
        console.log(`wincheck: ${wincheckArray}`)
        if (wincheckArray[0] + wincheckArray[1] + wincheckArray[2] === 3) {
            console.log("x wins")
        }
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
            <AnimatePresence>
                {!playerTurn && <motion.div className="botStatus" exit={{ opacity: 0 }}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1.3 }}>CPU is thinking</motion.p>
                </motion.div>}
                {playerTurn && <motion.div className="botStatus" exit={{ opacity: 0 }}>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1.3 }}>It's your turn!</motion.p>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}