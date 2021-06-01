const express = require("express");

const itemsRouter = express.Router();

// Item modal
const Item = require("../../modals/Items");

// @route   GET api/items
// @desc    Get all items
// @acsess  Public
itemsRouter.get("/", (req, res) => {
    Item.find()
        .sort({ date: 1 })
        .then((items) => {
            res.json(items);
        });
});

// @route   GET api/items
// @desc    Get one item
// @acsess  Public
itemsRouter.get("/:id", (req, res) => {
    Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json({message: 'No item found.'}));
});

// @route   POST api/items
// @desc    Post a new item
// @acsess  Public
itemsRouter.post("/", (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items
// @desc    Delete a target item
// @acsess  Public
itemsRouter.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Deleted" });
            console.log("item deleted");
        })
        .catch((err) => res.status(404).json({ message: "Item not found." }));
});

module.exports = itemsRouter;
