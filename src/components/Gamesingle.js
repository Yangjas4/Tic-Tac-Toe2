import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Square from './Square';
import useSound from 'use-sound';
import playerSfx from '../sounds/abs-confirm-1.mp3';
import cpuSfx from '../sounds/abs-cancel-1.mp3';
import colRef from '../firebase';
import { addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

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
};
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
};
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
};

const drawCheck = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 1
        }
    }
};

export default function Gamesingle() {
    console.log("%cRerendered", "color: yellow")
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

    // setSquaresArray only runs after either Player or CPU has made a move
    // => so we don't need to explicitly toggle setPlayerTurn(!playerTurn)
    // since useEffect(()=>..., [squaresArray]) will toggle playerTurn for us
    const [squaresArray, setSquaresArray] = useState(initSquares);

    const squareElements = squaresArray.map(square => <Square id={square.id} gameState={square.gameState} key={square.id} toggleSquare={toggleSquare} />);
    const [playerPieces, setPlayerPieces] = useState(playerConfig);

    // setPlayerTurn is only called after
    //  1.  Board Reset (resetGame())
    //  2.  either player or cpu plays -> setSquaresArray() -> toggle playerTurn 
    const [playerTurn, setPlayerTurn] = useState(playerConfig.player === 'x');
    const [winstreak, setWinstreak] = useState(0);
    const [playerMoveSound] = useSound(playerSfx);
    const [cpuMoveSound] = useSound(cpuSfx);
    const [isGameOver, setisGameOver] = useState(false);
    const [nickname, setNickname] = useState("");
    const [endscreen, setEndScreen] = useState(false);

    /*
    *   Can't just do squaresArray === initSquares because
    *   'Referential Equality' between initSquares and setSquaresArray(initSquares)
    *   makes it not equal
    */
    const isBoardCleared = (squaresArray) => {
        // Check if any square has a gameState which ISN'T empty string
        const isCleared = !squaresArray.some((square) => square.gameState !== "");
        console.log("isBoardCleared?: ", isCleared);
        return isCleared;
    }

    function toggleSquare(id) {
        console.log(`Clicked on square: ${id}`);
        if (playerTurn && squaresArray[id].gameState === "" && isGameOver === false) {
            setSquaresArray(prevSquares => {
                return prevSquares.map((square) => {
                    return square.id === id ? { ...square, gameState: playerPieces.player } : square
                })
            })
            playerMoveSound();
        } else {
            console.log(`%cTried to toggleSquare when not playerTurn`, "color: pink");
            return
        }
    }

    function resetGame() {
        setSquaresArray(initSquares);
        setPlayerTurn(true);
        console.log(`Reset Game Current Player: ${playerTurn}`)
    }

    useEffect(() => {
        console.log('%cuseEffect: %cSquares Array Updated', "color: orange", "color: white");
        if (!checkWin() && !isBoardCleared(squaresArray)) {
            console.log(`%cNot a winning state AND board isn't cleared`, "color: purple");
            // Set playerTurn to CPU if:
            //  board is not cleared
            //  AND not a new game (someone hasn't won yet)
            setPlayerTurn(prevState => !prevState);
        };
    }, [squaresArray])

    useEffect(() => {
        console.log(`%cuseEffect: %cPlayer Turn Updated To: ${playerTurn}`, "color: orange", "color: gold")

        // might need to clear setTimeout if setting playerTurn too quickly
        // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
        // use clearTimeout() to do that
        setTimeout(() => {
            if (!playerTurn) {
                let cpuMove = 0;
                do {
                    cpuMove = Math.floor(Math.random() * 9)
                } while (squaresArray[cpuMove].gameState !== "")

                console.log(`%cCPU Move toggling playerTurn to: %c${!playerTurn}`, "color: forestgreen", "color: white");
                setSquaresArray(prevSquares => {
                    return prevSquares.map((square) => {
                        return square.id === cpuMove ? { ...square, gameState: playerPieces.cpu } : square
                    })
                })
                cpuMoveSound();
            }
        }, 1500);
    }, [playerTurn])

    // useEffect(() => {
    //     db.collection('leaderboards').onSnapshot(snapshot => {
    //     })
    // }, [])

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

        //Row 1
        //x 
        if (wincheckArray[0] + wincheckArray[1] + wincheckArray[2] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o
        } else if (wincheckArray[0] + wincheckArray[1] + wincheckArray[2] === -3) {
            console.log("o wins");
            gameOver();
            return true;

            //Row 2
            //x
        } else if (wincheckArray[3] + wincheckArray[4] + wincheckArray[5] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o
        } else if (wincheckArray[3] + wincheckArray[4] + wincheckArray[5] === -3) {
            console.log("o wins");
            gameOver();
            return true;

            //Row 3
            //x
        } else if (wincheckArray[6] + wincheckArray[7] + wincheckArray[8] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o
        } else if (wincheckArray[6] + wincheckArray[7] + wincheckArray[8] === -3) {
            console.log("o wins");
            gameOver();
            return true;

            //Column 1
        } else if (wincheckArray[0] + wincheckArray[3] + wincheckArray[6] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o 
        } else if (wincheckArray[0] + wincheckArray[3] + wincheckArray[6] === -3) {
            console.log("o wins");
            gameOver();

            //Column 2
        } else if (wincheckArray[1] + wincheckArray[4] + wincheckArray[7] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o 
        } else if (wincheckArray[1] + wincheckArray[4] + wincheckArray[7] === -3) {
            console.log("o wins");
            gameOver();
            return true;

            //Column 3
        } else if (wincheckArray[2] + wincheckArray[5] + wincheckArray[8] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;

            //o 
        } else if (wincheckArray[2] + wincheckArray[5] + wincheckArray[8] === -3) {
            console.log("o wins");
            gameOver();
            return true;

            //Diagonals
        } else if (wincheckArray[0] + wincheckArray[4] + wincheckArray[8] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;


        } else if (wincheckArray[0] + wincheckArray[4] + wincheckArray[8] === -3) {
            console.log("o wins");
            gameOver();
            return true;


        } else if (wincheckArray[2] + wincheckArray[4] + wincheckArray[6] === 3) {
            console.log("x wins");
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            resetGame();
            return true;


        } else if (wincheckArray[2] + wincheckArray[4] + wincheckArray[6] === -3) {
            console.log("o wins");
            gameOver();
            return true;

        } else if (!wincheckArray.includes(0)) {
            console.log("draw");
            gameOver();
            return true;
        }
        return false;
    }

    function gameOver() {
        console.log('%cPlayer lost or drew, displaying game over modal', "color: red");
        setisGameOver(true);
    }

    function inputName(event) {
        setNickname(event.target.value);
        console.log(nickname)
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("%center was pressed while input selected", "color: green");
            handleSubmit();
        }
    }

    function handleSubmit() {
        console.log("%cName Submitted", "color: green")
        addDoc(colRef, {
            name: nickname,
            winstreak: winstreak
        })
            .then(gotoEndscreen());
    }

    function gotoEndscreen() {
        setEndScreen(true);
    }

    function playAgain() {
        setWinstreak(0);
        setisGameOver(false);
        setNickname("");
        setEndScreen(false);
        setPlayerTurn(true);
        setSquaresArray(initSquares);
    }

    return (
        <div className="actual-game-single">
            <h1 className={winstreak < 9 ? "winstreak-counter" : "winstreak-counter-big"} onClick={toggleSquare} ><span className="bold">Your</span> Winstreak: {winstreak}</h1>
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
            <AnimatePresence>
                {isGameOver && <motion.div className="background-transparent-black" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}></motion.div>}
                {isGameOver && <motion.div className="modal-submit-leaderboards"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {!endscreen && <div className="modal-content">
                        <h1 className="game-over-title"><span className="blueNoTyping">GAME</span>_OVER</h1>
                        <div className="game-over-subtitles">
                            <p className="game-over-subtitle-final-win">Your final winstreak is: <span className="win-number">{winstreak}</span></p>
                            <p className="game-over-subtitle-final-win">Please enter your name for a spot on the leaderboards</p>
                            <div className="input-name">
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={inputName}
                                    className="input-box"
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                                <p className="placeholder-name">Enter your name</p>
                                <motion.div className="submit-name" whileHover={{ scale: 1.1 }} onClick={handleSubmit}><p>Submit</p></motion.div>
                            </div>
                        </div>
                    </div>}
                    {endscreen && <div className="endscreen-content">
                        <h1 className="submission-success"><span className="blueNoTyping">SUBMISSION</span>_SUCCESSFUL</h1>
                        <motion.svg inital={{ scale: 0 }} animate={{ scale: 1}} width="111" height="111" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path fill-rule="evenodd" clip-rule="evenodd" d="M55.5 4.625C27.4031 4.625 4.625 27.4031 4.625 55.5C4.625 83.5969 27.4031 106.375 55.5 106.375C83.5969 106.375 106.375 83.5969 106.375 55.5C106.375 27.4031 83.5969 4.625 55.5 4.625ZM77.552 46.8975C77.9581 46.4333 78.2672 45.8927 78.4612 45.3073C78.6552 44.7219 78.7302 44.1036 78.6818 43.4888C78.6333 42.874 78.4624 42.2751 78.179 41.7273C77.8957 41.1796 77.5057 40.694 77.0319 40.2992C76.5581 39.9044 76.0102 39.6083 75.4203 39.4284C74.8305 39.2485 74.2105 39.1884 73.5971 39.2516C72.9836 39.3148 72.389 39.5 71.8482 39.7964C71.3074 40.0928 70.8313 40.4944 70.448 40.9775L50.5605 64.8379L40.2699 54.5426C39.3976 53.7001 38.2293 53.234 37.0166 53.2445C35.804 53.255 34.644 53.7415 33.7865 54.599C32.929 55.4565 32.4425 56.6165 32.432 57.8291C32.4215 59.0418 32.8876 60.2101 33.7301 61.0824L47.6051 74.9574C48.0596 75.4115 48.6036 75.766 49.2027 75.9983C49.8017 76.2305 50.4426 76.3354 51.0844 76.3063C51.7262 76.2771 52.3549 76.1145 52.9304 75.8289C53.5059 75.5434 54.0156 75.141 54.427 74.6475L77.552 46.8975Z" fill="white" />
                        </motion.svg>
                        <div className="endscreen-buttons">
                            <motion.div whileHover={{ scale: 1.1 }} className="play-again-button" onClick={playAgain}>PLAY AGAIN</motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} className="leaderboards-button"><Link to="/leaderboards">LEADERBOARDS</Link></motion.div>
                        </div>
                        <p className="endscreen-subtitle">Play again or visit the leaderboards!</p>

                    </div>}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}