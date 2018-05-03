import React, { Component } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCards } from "../redux/cards.js";
import { getDecks } from "../redux/decks.js";
import "./style.css";
import Header from "./Header.js";
import Nav from "./Nav.js";
import Home from "./Home";
import StudyCard from "./StudyCard/";
import Manager from "./Manager";
import Edit from "./Edit/";
import New from "./New";
import Footer from "./Footer.js";


class App extends Component {
    componentDidMount() {
        this.props.getDecks();
        this.props.getCards();
    }
    render() {
        const { loading } = this.props;
        console.log(loading);
        return (
                    <div className="app-wrapper">

                        <Header></Header>

                        <Nav></Nav>

                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/manager" component={Manager}></Route>
                            {!loading && <Route path="/study/:deckId" component={StudyCard}></Route>}
                            {!loading && <Route path="/edit/:deckId" component={Edit}></Route>}
                            {!loading && <Route path="/new/" component={New}></Route>}
                        </Switch>

                        <Footer></Footer>

                    </div>
        )
    }
}

const mapStateToProps = state => {
    return state.decks
}

export default withRouter(connect(mapStateToProps, { getDecks, getCards })(App));