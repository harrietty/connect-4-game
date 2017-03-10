import React, { Component } from 'react';

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
                <Board />
            </div>
        );
    }
}

App.propTypes = {

};