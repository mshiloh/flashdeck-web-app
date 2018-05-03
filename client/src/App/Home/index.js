import React from "react";

import "./style.css";

import Decks from "../Decks";

function Home(props) {
        const deckStyles = {
                ul: "homeUl",
                li: "homeLi"
        }

        return (
                <div className="homeWrapper">
                        <p className="homeHeader">Click on a deck title to study the flashcards</p>
                        <br/>
                        <Decks deckStyles={deckStyles} endpoint="study">
                        </Decks>
                </div>
        )
}

export default Home;
