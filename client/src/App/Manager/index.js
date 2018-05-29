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
            <div className="managerContainer">

                <Link to="/new" className="new">
                    <button className="newButt">Create New Deck</button>
                </Link>
                
                <div className="managerDeckTitles">
                    <Decks deckStyles={deckStyles} endpoint="edit"></Decks>
                </div>

            </div>
        </div>
    )
}

export default Manager;