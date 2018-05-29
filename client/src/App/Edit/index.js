import React, { Component } from "react";

import { connect } from "react-redux";

import "./style.css";

import EditItem from "./EditItem";
import NewCard from "./NewCard";

import { getCards } from "../../redux/cards.js";
import { editTitle } from "../../redux/decks.js";
import { removeDeck } from "../../redux/decks.js";

class Edit extends Component {
    constructor(props) {
        super(props);
        const { deckId } = props.match.params;
        console.log(props);
        const { data } = props.decks;
        const currDeck = data.find(deck => deck._id === deckId)
        this.state = {
            title: currDeck.title
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.getCards(this.props.match.params.deckId);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            title: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editTitle(this.props.match.params.deckId, this.state);
    }

    handleDelete(event) {
        this.props.removeDeck(this.props.match.params.deckId);
        this.props.history.push("/manager");

        alert("Deck deleted.");
    }

    render() {
        const { title } = this.state;
        console.log(title);
        const { data, loading, errMsg } = this.props.cards;
        console.log(data);

        const editCards = data.filter(card => card.deckId._id === this.props.match.params.deckId).map((card, i) => <EditItem key={card + i} {...card}></EditItem>)

        if (loading) {
            return (
                <div>...Loading</div>
            )
        } else if (errMsg) {
            return (
                <div>{errMsg}</div>
            )
        }
        return (
            <div className="editWrapper">
                <div className="addNewCardWrapper">
                    <NewCard deckId={this.props.match.params.deckId}></NewCard>
                </div>
                <div className="editFormWrapper">
                    <form onSubmit={this.handleSubmit}>

                        <div className="editTitleWrapper">
                            <h3 className="titleHeader">Deck Title</h3>
                            <input className="editTitle" onChange={this.handleChange} type="text" value={title} />
                        </div>

                        <div className="saveDeleteWrapper">
                            <div className="saveDeleteContainer">
                                <button className="saveButt">Save</button>
                                <button className="deleteButt" onClick={this.handleDelete}>Delete</button>
                            </div>
                        </div>

                    </form>

                    <h3 className="qAndAHeader">Flashcards</h3>

                    {editCards}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { getCards, editTitle, removeDeck })(Edit);