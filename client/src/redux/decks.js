import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const decksReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DECKS":
            return {
                ...state,
                data: action.decks,
                loading: false
            }

        case "NEW_DECK":
            return {
                data: [...state.data, action.deck]
            }

        case "EDIT_TITLE":
            return {
                ...state,
                data: state.data.map(deck => {
                    if (deck._id === action.id) {
                        console.log(action.updatedDeck)
                    } else {
                        return deck
                    }
                })
            }

        case "REMOVE_DECK":
            return {
                data: state.data.filter((deck, id) => id !== action.id).map(deck => {
                    if (deck._id === action.id) {
                        return action.deletedDeck
                    } else {
                        return deck
                    }
                })
            }
        case "ERR_MSG":
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg
            }
        default:
            return state;
    }
}

const flashdeck = "/api/decks/"

export const getDecks = () => {
    return dispatch => {
        axios.get(flashdeck)
            .then(response => {
                dispatch({
                    type: "GET_DECKS",
                    decks: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable."
                });
            });
    }
}

export const newDeck = (deck) => {
    return dispatch => {
        axios.post(flashdeck, { ...deck })
            .then(response => {
                dispatch({
                    type: "NEW_DECK",
                    deck: response.data
                })
            })
    }
}

export const editTitle = (id, updatedDeck) => {
    return dispatch => {
        axios.put(flashdeck + id, updatedDeck)
            .then(response => {
                dispatch({
                    type: "EDIT_TITLE",
                    id: id,
                    updatedDeck: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable."
                });
            })
    }
}



export const removeDeck = id => {
    return dispatch => {
        axios.delete(flashdeck + id)
            .then(response => {
                dispatch({
                    type: "REMOVE_DECK",
                    id: id,
                    removedDeck: response.data

                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Deck deleted."
                });
            })
    }
}

export default decksReducer;