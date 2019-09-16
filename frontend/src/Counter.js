import React, { Component } from 'react'

class Counter extends Component {
    // YOUR CODE GOES BELOW
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    increment = () => {
        this.setState({ counter: this.state.counter + 1 });
    }
    decrement = () => {
        this.setState({ counter: this.state.counter - 1 });
    }
    render() {
        return (
            <div>
                <button onClick= {this.increment}> Increment </button>
                <button onClick= {this.decrement}> Decrement </button> 
                <h2>{this.state.counter}</h2>
            </div>
        )
    }
}

export default Counter
