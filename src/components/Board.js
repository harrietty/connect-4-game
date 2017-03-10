import React, { Component } from 'react';
import { genNewBoard, checkForSpace, takeTurn, checkForWinner } from '../logic/Connect4Board';
import Column from './Column';
import Winner from './Winner';
import PlayAgain from './PlayAgain';
import TurnDisplay from './TurnDisplay';

const ROWS = 6;
const COLS = 7;

export default class Board extends Component {
    constructor (props) {
        super(props);
        this.state = {
            board: genNewBoard(COLS, ROWS),
            player: 'Player 1',
            winner: null
        };
        this.takeTurn = this.takeTurn.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    takeTurn (col) {
        if (checkForSpace(this.state.board, col, ROWS)) {
            const newBoard = takeTurn(this.state.board, col, this.state.player);
            const winner = checkForWinner(newBoard);
            this.setState({
                board: newBoard,
                player: this.state.player === 'Player 1' ? 'Player 2' : 'Player 1',
                winner: winner || null
            });
        }
    }

    playAgain () {
        this.setState({
            winner: null,
            board: genNewBoard(COLS, ROWS),
            player: 'Player 1'
        });
    }

    render () {
        if (this.state.winner) {
            return (
            <div>
                <Winner winner={this.state.winner} />
                <PlayAgain playAgain={this.playAgain} />
            </div>
            );
        } else {
            return (
                <div>
                    <TurnDisplay player={this.state.player} />
                    <div className='board'>
                        {this.state.board.map((col, i) => {
                            return (<Column player={this.state.player} column={i} cells={col} key={i} takeTurn={this.takeTurn} />);
                        })}
                    </div>
                </div>
            );
        }
    }
}
Board.propTypes = {

};