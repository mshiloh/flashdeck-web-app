import React from "react";

import "./style.css";

import Decks from "../Decks";

function Home(props) {
        const deckStyles = {
                div: "homeUl",
                Link: "homeLi"
        }

        return (
                <div className="homeWrapper">
                <div className="homeContainer">
                        <p className="homeHeader">Click on a deck title to study the flashcards</p>
                        <Decks deckStyles={deckStyles} endpoint="study">
                        </Decks>
                </div>
                </div>
        )
}

export default Home;
