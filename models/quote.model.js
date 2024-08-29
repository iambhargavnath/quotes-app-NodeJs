const sql = require("./db.js");

// Constructor
const Quote = function(quote) {
    this.id = quote.id;
    this.quote = quote.quote;
    this.author = quote.author;
    this.language = quote.language;
};

// Create new quote
Quote.create = (newQuote, result) => {
    sql.query("INSERT INTO quote SET ?", newQuote, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created quote: ", { id: res.insertId, ...newQuote });
        result(null, { id: res.insertId, ...newQuote });
    });
};

// Get all quotes
Quote.getAll = result => {
    sql.query("SELECT * FROM quote", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("quotes: ", res);
        result(null, res);
    });
};

Quote.getQuoteById = (id, result) => {
    sql.query("SELECT * FROM quote WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("found quote: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Quote with the id
        result({ kind: "not_found" }, null);
    });
};

// Update a quote by id
Quote.updateById = (id, quote, result) => {
    sql.query(
        "UPDATE quote SET id = ?, quote = ?, author = ?, language = ? WHERE id = ?",
        [quote.id, quote.quote, quote.author, quote.language, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Quote with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated quote: ", { id: id, ...quote });
            result(null, { id: id, ...quote });
        }
    );
};

// Delete a quote by id
Quote.deleteById = (id, result) => {
    sql.query("DELETE FROM quote WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Quote with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted quote with id: ", id);
        result(null, res);
    });
};

// Export the Quote model
module.exports = Quote;
