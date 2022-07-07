import React from 'react';

export default function Square(props) {

    function setImage() {
        if (props.gameState === "x") {
            return "images"
        }
    }

    return (
        <div className="square"></div>
    )
}