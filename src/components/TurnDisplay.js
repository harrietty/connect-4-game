import React, { Component } from 'react';

export default class TurnDisplay extends Component {
    render () {
        return (
            <div className='turnDisplay'>
                <div className={`turnBox ${this.props.player === 'Player 1' && 'selected'}`}>
                    Player 1
                </div>
                <div className={`turnBox ${this.props.player === 'Player 2' && 'selected'}`}>
                    Player 2
                </div>
            </div>
        );
    }
}

TurnDisplay.propTypes = {
    player: React.PropTypes.string
};