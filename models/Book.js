const mongoose = require('mongoose');

const book_schema = new mongoose.Schema({
    title  : {type : String, required: true},
    author : {type : String, required: true}
});

module.exports = mongoose.model('Book', book_schema);