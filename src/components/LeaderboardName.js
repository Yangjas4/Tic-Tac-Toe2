
import React from 'react';

export default function LeaderboardName(props) {

    const topThree = checkTopThree()

    function checkTopThree() {
        if (props.rank === 1) {
            return "first-place"
        } else if (props.rank === 2) {
            return "second-place"
        } else if (props.rank === 3) {
            return "third-place"
        } else {
            return ""
        }
    }

    return (
        <tr>
            <td className={`rank ${topThree}`}>#{props.rank}</td>
            <td>{props.name}</td>
            <td>{props.score}</td>
        </tr>
    )
}