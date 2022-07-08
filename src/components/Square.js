import React from 'react';
import { motion } from 'framer-motion';

export default function Square(props) {
    const svgAnim = {
        initial: {
            opacity: 0,
            pathLength: 0
        },

        final: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 2
            }
        }
    }


    return (
        <div
            className="square"
            id={props.id}
            onClick={props.toggleSquare}
        >
            {props.gameState === "x" && <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect variants={svgAnim} initial="initial" animate="final" width="80.7013" height="10.6587" transform="matrix(0.703566 -0.71063 0.703566 0.71063 0.721924 57.3489)" fill="#5685FF" />
                <motion.rect variants={svgAnim} initial="initial" animate="final" width="80.7013" height="10.6587" transform="matrix(-0.703566 -0.71063 0.703566 -0.71063 56.7786 65)" fill="#5685FF" />
            </svg>}
            {props.gameState === "o" && <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle variants={svgAnim} initial="initial" animate="final" cx="36.5" cy="36.5" r="31.5" stroke="#E26161" stroke-width="9" />
            </svg>}
        </div>
    )
}