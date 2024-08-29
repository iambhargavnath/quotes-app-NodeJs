const Quote = require("../models/quote.model.js");

// Create and Save a new Quote
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Quote
    const quote = new Quote({
        quote: req.body.quote,
        author: req.body.author,
        language: req.body.language
    });

    // Save Quote in the database
    Quote.create(quote, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Quote."
            });
        else res.send(data);
    });
};

// Retrieve all Quotes from the database
exports.findAll = (req, res) => {
    Quote.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving quotes."
            });
        else res.send(data);
    });
};

// Retrieve a single Quote with id
exports.findOne = (req, res) => {
    Quote.getQuoteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Quote with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Quote with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Quote identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Quote.updateById(
        req.params.id,
        new Quote(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Quote with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Quote with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Quote with the specified id in the request
exports.delete = (req, res) => {
    Quote.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Quote with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Quote with id " + req.params.id
                });
            }
        } else res.send({ message: `Quote was deleted successfully!` });
    });
};
