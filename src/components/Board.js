import React, { Component } from 'react';
import { genNewBoard } from '../logic/Connect4Board';
import Column from './Column';

export default class Board extends Component { 
    constructor (props) {
        super(props);
        this.state = {
            board: genNewBoard(7, 6),
            player: 'Player 1'
        };
        this.takeTurn = this.takeTurn.bind(this);
    }

    takeTurn (col) {
        console.log(col);
    }

    render () {
        return (
            <div className='board'>
                {this.state.board.map((col, i) => {
                    return (<Column player={this.state.player} column={col} key={i} takeTurn={this.takeTurn} />);
                })}
            </div>
        );
    }
}
Board.propTypes = {
 
};