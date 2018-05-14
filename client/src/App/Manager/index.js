import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import Decks from "../Decks";
// import New from "../New";
// import Edit from "../Edit";

function Manager(props) {
    const deckStyles = {
        div: "managerUl",
        Link: "managerLi"
    }
    return (
        <div className="managerWrapper">
            <div className="managerDeckTitles">
                <Decks deckStyles={deckStyles} endpoint="edit"></Decks>
            </div>
            <Link to="/new" className="new">
                <button className="newButt">Create New Deck</button>
            </Link>
        </div>
    )
}

export default Manager;