import React, { Component } from 'react';

export default class Counter extends Component {
    render () {
        return (
            <div className='counterBox'>
                <div className='counter'>
                    {this.props.player}
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    player: React.PropTypes.string,
    position: React.PropTypes.array
};