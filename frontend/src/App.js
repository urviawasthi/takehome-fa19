import React, { Component } from 'react'
import Instructions from './Instructions'
import Counter from './Counter'
import Contact from './Contact'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [
            {id: 1, name: "Angad", nickname: "greg", hobby: "dirty-ing"},
            {id: 2, name: "Roy", nickname: "uwu", hobby: "weeb"},
            {id: 3, name: "Daniel", nickname: "oppa", hobby: "losing money with options trading"},
            ], 
            newContactId: 3,
            newContactName: null, 
            newContactNickname: null, 
            newContactHobby: null
        }
    }
    addContact = () => {
        this.setState({
            contacts: [...this.state.contacts, { id: this.state.newContactId + 1, name: this.state.newContactName, nickname: this.state.newContactNickname, hobby: this.state.newContactHobby }]
        })
    }
    setContactId = () => {
        this.setState({
            newContactId: Counter.state.counter + 1
        });
    }
    setContactName = (e) => {
        this.setState({
            newContactName: e.target.value
        });
    }
    setContactNickname = (e) => {
        this.setState({
            newContactNickname: e.target.value 
        });
    }
    setContactHobby = (e) => {
        this.setState({
            newContactHobby:  e.target.value 
        });
    }

    render() {
        return (
            //mapping contacts
            <div className="App">
                    <label>
                        Contact Name:
                    <input type="text" onChange={this.setContactName} />
                        Contact Nickname:
                    <input type="text" onChange={this.setContactNickname} />
                        Contact Hobby:
                    <input type="text" onChange={this.setContactHobby} />
                    </label>
                <button type="button" onClick={this.addContact}> Add Contact </button>
                <Instructions complete="true" />
                <Counter />
                {this.state.contacts.map(x => (
                    <Contact id={x.id} name={x.name} nickname={x.nickname} hobby={x.hobby} />
                ))}
            </div>
        )
    }
}

export default App
