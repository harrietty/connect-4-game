import React, { Component } from 'react';

export default class TurnDisplay extends Component {
    render () {
        return (
            <div className='turnDisplay'>
                <div className={`turnBox ${this.props.player === 'Player 1' && 'selected'}`}>
                    <span className='playerName'>Player 1</span>
                    <i className='fa fa-user-o'/>
                </div>
                <div className={`turnBox ${this.props.player === 'Player 2' && 'selected'}`}>
                    <span className='playerName'>Player 2</span>
                    <i className='fa fa-user-o'/>
                </div>
            </div>
        );
    }
}

TurnDisplay.propTypes = {
    player: React.PropTypes.string
};