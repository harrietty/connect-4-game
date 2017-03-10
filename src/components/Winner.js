import React from 'react';

export default function Winner (props) {
    return (
        <h1>
            {props.winner}
        </h1>
    );
}

Winner.propTypes = {
    winner: React.PropTypes.string
};