const e = require('express');
const mongodb = require('../DB/connection');
const ObjectId = require('mongodb').ObjectId;

//get all items in database
const getBooks = async (req, res, next) => {
    // #swagger.description = 'list all books in DB'
    const result = await mongodb.getDB().db('library').collection('fav_books').find();
    result.toArray().then((listings) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(listings);
    });
};

//a function to post a new book listing
const postBook = async (req, res) => {
    // #swagger.description = 'post one book listing'
    const book = {
        title: req.body.title,
        authors: req.body.authors,
        publishing: req.body.publishing,
        language: req.body.language,
        genres: req.body.genres
    };
    const response = await mongodb.getDB().db('library').collection('fav_books').insertOne(book);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error when creating book listing');
    }
};

//update a book listing
const updateBook = async (req, res) => {
    // #swagger.description = 'Update a book based on ID'
    const bookID = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        authors: req.body.authors,
        publishing: req.body.publishing,
        language: req.body.language,
        genres: req.body.genres
    };
    const response = await mongodb.getDB().db('library').collection('fav_books').replaceOne({_id: bookID}, book);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `Couldn't update book. Error.`);
    }
};

//update a book title only
const updateTitle = async (req, res) => {
    // #swagger.description = 'Update only a title based on the listing ID'
    const bookID = new ObjectId(req.params.id);
    const newTitle = req.body.title;
    const response = await mongodb.getDB().db('library').collection('fav_books').updateOne({_id: bookID}, {$set:{title: newTitle}});
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || `Couldn't update title. Error`);
    }
};

//delete a book listing
const delBook = async (req, res) => {
    // #swagger.description = 'Delete whole book listing based on ID'
    const bookID = new ObjectId(req.params.id);
    const response = await mongodb.getDB().db('library').collection('fav_books').deleteOne({_id: bookID}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || `Book could not be deleted due to an error.`);
    }
};

/* POST format for books

{
    "title": "",
    "authors": [],
    "publishing": "",
    "language": "",
    "genres": []
}

*/

module.exports = {getBooks, postBook, updateBook, updateTitle, delBook};