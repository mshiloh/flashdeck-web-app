import React, { Component } from 'react'
import { connect } from "react-redux";
import { newCard } from "../../redux/cards.js";

class NewCard extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                question: "",
                answer: "",
                showAddForm: false
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleAddForm = this.toggleAddForm.bind(this);
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
        this.props.newCard(this.state.inputs, this.props.deckId);
        this.setState(this.initialState);

    }

    toggleAddForm(event) {
        event.preventDefault();
        this.setState({ showAddForm: !this.state.showAddForm })
    }

    render() {
        const { question, answer } = this.state.inputs;
        return (
            <div className="newCardWrapper">

                <form onSubmit={this.handleSubmit} className="newCardForm">

                        <p onClick={this.toggleAddForm} className="addNewCardButt">Add New Card</p>

                    <div className="addNewCardFormWrapper">
                        {this.state.showAddForm && <input onChange={this.handleChange} className="newQuestion" type="text" value={question} name="question" placeholder="Enter question..." />}

                        {this.state.showAddForm && <input onChange={this.handleChange} className="newAnswer" type="text" value={answer} name="answer" placeholder="Enter answer..." />}

                        {this.state.showAddForm && <button className="saveNewCardButt">Save</button>}
                    </div>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.card
}

export default connect(mapStateToProps, { newCard })(NewCard);