import React, { Component } from 'react';
import Counter from './Counter';

export default class Column extends Component {
    render () {
        return (
            <div className='column'>
                {this.props.column.map((cell, i) => {
                    return (<Counter key={i} position={cell.position} />);
                })}
            </div>
        );
    }
}

Column.propTypes = {
    column: React.PropTypes.array
};