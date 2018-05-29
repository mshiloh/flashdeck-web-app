import axios from "axios";

const initialState = {
    data: [],
    loading: true,
    errMsg: "",
    currentIndex: 0
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CARDS":
            return {
                ...state,
                data: action.cards,
                loading: false
            }

        case "NEW_CARD":
            return {
                data: [...state.data, action.card]
            }

        case "EDIT_CARD":
            return {
                ...state,
                data: state.data.map(card => {
                    if (card._id === action.id) {
                        return action.updatedCard
                    } else {
                        return card
                    }
                })
            }

        case "REMOVE_CARD":
            return {
                data: state.data.filter(card => card._id !== action.id)
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

const flashdeck = "/api/cards/";

export const getCards = () => {
    return dispatch => {
        axios.get(`${flashdeck}`)
            .then(response => {
                dispatch({
                    type: "GET_CARDS",
                    cards: response.data
                })
                console.log(response.data);
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, your data is unavailable."
                });
            });
    }
}

export const newCard = (card, deckId) => {
    return dispatch => {
        axios.post(flashdeck, {...card, deckId})
            .then(response => {
                dispatch({
                    type: "NEW_CARD",
                    card: response.data
                })
            })
    }
}

export const editCard = (id, updatedCard) => {
    return dispatch => {
        axios.put(flashdeck + id, updatedCard)
            .then(response => {
                dispatch({
                    type: "EDIT_CARD",
                    id: id,
                    updatedCard: response.data
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



export const removeCard = id => {
    return dispatch => {
        axios.delete(flashdeck + id)
            .then(response => {
                dispatch({
                    type: "REMOVE_CARD",
                    id: id,
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

export default cardsReducer;