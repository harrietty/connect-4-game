import React, { Component } from 'react';
import { genNewBoard, checkForSpace, takeTurn } from '../logic/Connect4Board';
import Column from './Column';

const ROWS = 6;
const COLS = 7;

export default class Board extends Component { 
    constructor (props) {
        super(props);
        this.state = {
            board: genNewBoard(COLS, ROWS),
            player: 'Player 1'
        };
        this.takeTurn = this.takeTurn.bind(this);
    }

    takeTurn (col) {
        if (checkForSpace(this.state.board, col, ROWS)) {
            const newBoard = takeTurn(this.state.board, col, this.state.player);
            this.setState({
                board: newBoard,
                player: this.state.player === 'Player 1' ? 'Player 2' : 'Player 1'
            }, () => {
                console.log(this.state);
            });
        }
    }

    render () {
        return (
            <div className='board'>
                {this.state.board.map((col, i) => {
                    return (<Column player={this.state.player} column={i} cells={col} key={i} takeTurn={this.takeTurn} />);
                })}
            </div>
        );
    }
}
Board.propTypes = {
 
};