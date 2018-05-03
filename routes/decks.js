const express = require("express");
const deckRouter = express.Router();

const DeckModel = require("../models/decks.js");
const CardModel = require("../models/cards.js");

//actual routes go here
deckRouter.route("/")
    .get((req, res) => {
        DeckModel.find(req.query)
            .populate("deckId")
            .exec((err, foundDecks) => {
                if (err) return res.send(err);
                res.status(200).send(foundDecks)
            });
    })
    .post((req, res) => {
        const newDeck = new DeckModel(req.body);
        newDeck.save((err, savedDeck) => {
            if (err) return res.send(err);
            DeckModel.populate(savedDeck, { path: "deckId" }, (err, popDeck) => {
                if (err) return res.send(err);
                res.status(201).send(popDeck);
            });
        });
    });

// GET one request
deckRouter.route("/:id")
    .get((req, res) => {
        DeckModel.findOne({ _id: req.params.id })
            .populate("deckId")
            .exec((err, foundDeck) => {
                if (err) return res.send(err);
                if (!foundDeck) return res.status(404).send({ message: "deck not found" })
                res.status(200).send(foundDeck);
            });
    })
    // DELETE one request
    .delete((req, res) => {
        DeckModel.findOneAndRemove({ _id: req.params.id }, (err, deletedDeck) => {
            if (err) return res.send(err);
            if (!deletedDeck) return res.status(404).send({ message: "deck not found" })
            CardModel.deleteMany({ deckId: req.params.id },
                (err, foundCards) => {
                    console.log(foundCards);
                    if (err) return res.send(err);
                    res.status(204).send();
                }
            )
        })
    })
    //PUT one
    .put((req, res) => {
        DeckModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedDeck) => {
            if (err) return res.send(err);
            if (!updatedDeck) return res.status(404).send({ message: "deck not found" });
            res.status(200).send(updatedDeck);
        })
    })

module.exports = deckRouter;