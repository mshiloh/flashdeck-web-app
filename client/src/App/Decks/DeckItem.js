import React from "react";
import { Link } from "react-router-dom";

function DeckItem(props) {
    const { title, _id, endpoint } = props;
    return (

            <Link className={props.liStyles} to={`/${endpoint}/${_id}/`}>{title}</Link>
    )
}
export default DeckItem;