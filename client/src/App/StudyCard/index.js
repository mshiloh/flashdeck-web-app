import React, { Component } from "react";

import { connect } from "react-redux";

import "./style.css";

import CardsItem from "./CardsItem";

import { getCards } from "../../redux/cards.js";
import { getDecks } from "../../redux/decks.js";

import NewCard from "../Edit/NewCard";

class StudyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
    }

    componentDidMount() {
        this.props.getCards(this.props.match.params.deckId);
    }

    nextQuestion(length) {
        this.setState(prevState => {
            console.log(prevState.currentIndex, length);
            return { currentIndex: prevState.currentIndex + 1 < length ? prevState.currentIndex + 1 : 0 }
        })
    }

    previousQuestion() {
        if (this.state.currentIndex === 0)
            return;

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1

        }))
    }


    render() {

        const { data, loading, errMsg } = this.props;
        const myCards = data.filter(card => card.deckId._id === this.props.match.params.deckId).map((card, i) => <CardsItem key={card + i} {...card}></CardsItem>)

        if (loading) {
            return (
                <div>...Loading</div>
            )
        } else if (errMsg) {
            return (
                <div>{errMsg}</div>
            )
        } else {
            let { currentIndex } = this.state;

            return (
                <div className="studyWrapper">
                    {myCards[currentIndex]}
                    <div className="nextBackWrapper">
                        <button className="backButt" onClick={this.previousQuestion} >⇦</button>
                        <button className="nextButt" onClick={() => this.nextQuestion(myCards.length)} >⇨</button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return state.cards
}

export default connect(mapStateToProps, { getCards })(StudyCard);