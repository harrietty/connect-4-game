import React, { Component } from 'react';

export default class Counter extends Component {
    render () {
        const color = this.props.player === 'Player 2' ? 'redCounter' : this.props.player === null ? '' : 'blueCounter';
        return (
            <div className='counterBox'>
                <div className={`counter ${color}`}>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    player: React.PropTypes.string
};