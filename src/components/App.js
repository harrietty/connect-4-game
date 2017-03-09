import React, { Component } from 'react';

import TurnDisplay from './TurnDisplay';
import Board from './Board';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            player: 'Player 1'
        };
    }
    render () {
        return (
            <div>
                <header>
                    Connect 4
                </header>
                <TurnDisplay player={this.state.player} />
                <Board />
            </div>
        );
    }
}

App.propTypes = {

};