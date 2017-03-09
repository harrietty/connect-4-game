import React, { Component } from 'react';
import TurnDisplay from './TurnDisplay';

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
            </div>
        );
    }
}

App.propTypes = {

};