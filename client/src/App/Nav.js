import React from "react";
import { Link } from "react-router-dom"

function Nav(props) {
    return (
        <div className="navWrapper">

            <nav>
                <Link to="/" className="homeLink">home</Link>
                <Link to="/manager" className="managerLink">deck manager</Link>
            </nav>
        </div>
    )
}

export default Nav;