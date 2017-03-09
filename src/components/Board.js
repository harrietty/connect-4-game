import React, { Component } from 'react';
import _ from 'underscore';
import { genNewBoard } from '../logic/Connect4Board';
import { rotateMatrix } from '../logic/helpers';
import Counter from './Counter';

export default class Board extends Component {
    constructor (props) {
        super(props);
        this.state = {
            board: genNewBoard(7, 6)
        };
    }

    render () {
        const rotatedArray = rotateMatrix(rotateMatrix(rotateMatrix(this.state.board)));
        return (
            <div className='board'>
                {_.flatten(rotatedArray).map((counter, i) => {
                    return <Counter key={i} player={counter.player} position={counter.position} />;
                })}
            </div>
        );
    }
}
Board.propTypes = {

};