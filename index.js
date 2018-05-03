const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const logger = require("./middleware/logger.js");
const deckRouter = require("./routes/decks.js");
const cardRouter = require("./routes/cards.js");

const app = express();

//config
const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URI || "mongodb://localhost";

//middleware
app.use(bodyParser.json())
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/api/decks", deckRouter);
app.use("/api/cards", cardRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
})



app.listen(
    app.listen(port, () => console.log("Server running on port " + port)));