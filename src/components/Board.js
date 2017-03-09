import React, { Component } from 'react';
import _ from 'underscore';
import { genNewBoard } from '../logic/Connect4Board';
import { fillWithNull, rotateMatrix } from '../logic/helpers';
import Counter from './Counter';

export default class Board extends Component {
    constructor (props) {
        super(props);
        this.state = {
            board: genNewBoard()
        };
    }

    render () {
        return (
            <div className='board'>
                {_.flatten(rotateMatrix(fillWithNull(this.state.board, 6))).map((counter, i) => {
                    return <Counter key={i} />;
                })}
            </div>
        );
    }
}
Board.propTypes = {

};