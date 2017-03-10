import React, { Component } from 'react';
import Counter from './Counter';

export default class Column extends Component {
    constructor (props) {
        super(props);
        this.state = {
            highlighted: false
        };
        this.toggleHighlight = this.toggleHighlight.bind(this);
    }

    toggleHighlight () {
        this.setState({
            highlighted: !this.state.highlighted
        });
    }

    render () {
        const classes = `column ${this.state.highlighted && 'highlighted'}`;
        return (
            <div className={classes} onMouseEnter={this.toggleHighlight} onMouseLeave={this.toggleHighlight} onClick={this.props.takeTurn.bind(null, this.props.column)}>
                {this.props.cells.map((cell, i) => {
                    return (<Counter key={i} player={cell.player} />);
                })}
            </div>
        );
    }
}

Column.propTypes = {
    cells: React.PropTypes.array,
    takeTurn: React.PropTypes.func,
    column: React.PropTypes.number
};