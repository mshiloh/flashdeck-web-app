import React, { Component } from 'react'
import { connect } from "react-redux";
import { newDeck } from "../../redux/decks.js";
import "./style.css";

class New extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                title: ""
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.newDeck(this.state.inputs);
        this.setState(this.initialState);
        alert("New deck added.")
        this.props.history.push("/manager");
    }

    render() {
        console.log(this.state)
        const { title } = this.state.inputs;
        return (
            <div className="newWrapper">

                <form onSubmit={this.handleSubmit} className="newDeckForm">

                    <input onChange={this.handleChange} className="newTitle" type="text" value={title} name="title" placeholder="Deck title..." />

                    <button  className="saveNewButt">Save</button>

                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { newDeck })(New);