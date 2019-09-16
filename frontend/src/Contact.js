import React, { Component } from 'react'

class Contact extends Component {
  // YOUR CODE GOES BELOW
  
  render() {
    return (
        <div>
            <p> {this.props.id} </p>
            <p> {this.props.name} </p>
            <p> {this.props.nickname} </p>
            <p> {this.props.hobby} </p>
        </div> 
    )
  }
}

export default Contact
