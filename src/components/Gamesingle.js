import React from 'react';
import { motion } from 'framer-motion';

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

    return (
        <div className="actual-game-single">
            <h1 className="winstreak-counter"><span className="bold">Your</span> Winstreak: 0</h1>
            <motion.svg className="gameboard" width="390" height="373" viewBox="0 0 390 373" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect variants={topDown} initial="hidden" animate="visible" x="123" width="11" height="373" fill="#492CFF" />
                <motion.rect variants={bottomUp} initial="hidden" animate="visible" x="257" width="11" height="373" fill="#492CFF" />
                <motion.rect variants={fadeIn} initial="hidden" animate="visible" x="390" y="237" width="11" height="390" transform="rotate(90 384 237)" fill="#492CFF" />
                <motion.rect variants={fadeIn} initial="hidden" animate="visible" x="390" y="107" width="11" height="390" transform="rotate(90 390 107)" fill="#492CFF" />
            </motion.svg>
            <div className="squares"></div>
        </div>
    )
}