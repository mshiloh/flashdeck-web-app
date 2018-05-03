const mongoose = require("mongoose");

const { Schema } = mongoose;

const cardSchema = new Schema({
    question: String,
    answer: String,
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "decks"
    }
})

const CardModel = mongoose.model("cards", cardSchema);
module.exports = CardModel;