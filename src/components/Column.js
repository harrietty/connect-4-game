import React, { Component } from 'react';
import Counter from './Counter';

export default class Column extends Component {
    constructor (props) {
        super(props);
        this.state = {
            highlighted: false
        };
        this.toggleHighlight = this.highlightCol.bind(this);
    }

    toggleHighlight () {
        this.setState({
            highlighted: !this.state.highlighted
        });
    }

    render () {
        const classes = `column ${this.state.highlighted && 'highlighted'}`;
        return (
            <div className={classes} onMouseEnter={this.toggleHighlight} onMouseLeave={this.toggleHighlight}>
                {this.props.column.map((cell, i) => {
                    return (<Counter key={i} position={cell.position} />);
                })}
            </div>
        );
    }
}

Column.propTypes = {
    column: React.PropTypes.array,
    takeTurn: React.PropTypes.func
};