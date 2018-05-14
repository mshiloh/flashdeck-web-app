import React, { Component } from "react";

import { connect } from "react-redux";

import { getDecks } from "../../redux/decks.js";

import DeckItem from "./DeckItem.js";

class Decks extends Component {
    componentDidMount() {
        this.props.getDecks();
    }
    render() {
        const { data, loading, errMsg, endpoint } = this.props;
        const myDecks = data.map((deck, i) => <DeckItem endpoint={endpoint}liStyles={this.props.deckStyles.Link} key={deck + i} {...deck}></DeckItem>)
        if (loading) {
            return (
                <div>...Loading</div>
            )
        } else if (errMsg) {
            return (
                <div>{errMsg}</div>
            )
        } else {
            return (
                <div className={this.props.deckStyles.div}>
                    {myDecks}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return state.decks
}

export default connect(mapStateToProps, { getDecks })(Decks);
