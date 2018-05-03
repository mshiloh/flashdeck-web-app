import React from "react";
import { Link } from "react-router-dom";

function DeckItem(props) {
    const { title, _id, endpoint } = props;
    return (

        <li className={props.liStyles}>
            <Link to={`/${endpoint}/${_id}/`}>{title}</Link>
        </li>
    )
}
export default DeckItem;