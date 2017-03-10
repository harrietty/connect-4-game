import React from 'react';

export default function PlayAgain (props) {
    return (
        <div>
            <button onClick={props.playAgain}>Play Again!</button>
        </div>
    );
}

PlayAgain.propTypes = {
    playAgain: React.PropTypes.func
};