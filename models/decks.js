const mongoose = require("mongoose");

const { Schema } = mongoose;

const deckSchema = new Schema({
        title: String
})

const DeckModel = mongoose.model("decks", deckSchema);
module.exports = DeckModel;