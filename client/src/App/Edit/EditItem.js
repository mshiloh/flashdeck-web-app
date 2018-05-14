import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard } from "../../redux/cards.js";
import { removeCard } from "../../redux/cards.js";

class EditItem extends Component {
    constructor(props) {
        super(props);
        const { id } = props;
        console.log(props);
        const { data } = props.cards;
        const currCard = data.find(card => card._id === id)
        this.state = {
            inputs: {
                question: this.props.question,
                answer: this.props.answer
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        const { value, name } = event.target;
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
        this.props.editCard(this.props._id, this.state.inputs);
    }

    handleDelete(event) {
        event.preventDefault();
        this.props.removeCard(this.props._id);
        // alert("Card deleted.")
    }

    render() {
        const { question, answer, _id, endpoint } = this.state.inputs;
        return (
            <form onSubmit={this.handleSubmit} className="editForm">
                
                    <input onChange={this.handleChange} className="editQuestion" type="text" value={question} name="question" />

                    <input onChange={this.handleChange} className="editAnswer" type="text" value={answer} name="answer" />
                    
                <button className="saveButt">Save</button>

                <button className="deleteButt" onClick={this.handleDelete}>Delete</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { editCard, removeCard })(EditItem);