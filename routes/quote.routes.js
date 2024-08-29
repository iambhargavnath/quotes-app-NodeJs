module.exports = app => {
    const quotes = require("../controllers/quote.controller.js");

    // Create a new Quote
    app.post("/api/save", quotes.create);

    // Retrieve all Quotes
    app.get("/api/quotes", quotes.findAll);

    // Retrieve a single Quote with id
    app.get("/api/quote/:id", quotes.findOne);

    // Update a Quote with id
    app.put("/api/update/:id", quotes.update);

    // Delete a Quote with id
    app.delete("/api/delete/:id", quotes.delete);
};
