"use strict";

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    authors: {type: [String], required: true},
    publishing: {type: String, required: true},
    language: {type: String, required: true},
    genres: {type: [String], required: true}
});

/*
{
    "title": "",
    "authors": [],
    "publishing": "",
    "language": "",
    "genres": []
}
*/

const Book = (0, mongoose.model)("Book", bookSchema);

exports.default = Book;