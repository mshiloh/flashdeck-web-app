import React from "react";
import { Link } from "react-router-dom"

function Nav(props) {
    return (
        <div className="navWrapper">

            <nav>
                <Link to="/" className="homeLink">Home</Link>
                <Link to="/manager" className="managerLink">Deck Manager</Link>
            </nav>
        </div>
    )
}

export default Nav;