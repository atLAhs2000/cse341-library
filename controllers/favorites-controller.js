const e = require('express');
const mongodb = require('../DB/connection');
const ObjectId = require('mongodb').ObjectId;

//get all items in database
const getBooks = async (req, res, next) => {
    // #swagger.description = 'list all books in DB'
    try {
        const result = await mongodb.getDB().db('library').collection('fav_books').find();
        result.toArray().then((listings) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(listings);
        });
    } catch (error) {
        next(error);
    }
};

//a function to post a new book listing
const postBook = async (req, res, next) => {
    // #swagger.description = 'post one book listing'
    try {
        if (!req.body.title || !req.body.authors || !req.body.publishing || !req.body.language || !req.body.genres) {
            res.status(400).send({message: 'Fill up all fields'});
            return;
        } else if (!Array.isArray(req.body.authors) || !Array.isArray(req.body.genres)) {
            res.status(400).send({message: 'Field must be an array'});
            return;
        }
        const book = fillBook(req.body.title, req.body.authors, req.body.publishing, req.body.language, req.body.genres);
        const response = await mongodb.getDB().db('library').collection('fav_books').insertOne(book);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).send({message: `Book could not be posted due to an error.`});
        next(err);
    }
};

//update a book listing
const updateBook = async (req, res, next) => {
    // #swagger.description = 'Update a book based on ID'
    try {
        if (!req.body.title || !req.body.authors || !req.body.publishing || !req.body.language || !req.body.genres) {
            res.status(400).send({message: 'Fill up all fields'});
            return;
        } else if (!Array.isArray(req.body.authors) || !Array.isArray(req.body.genres)) {
            res.status(400).send({message: 'Field must be an array'});
            return;
        }
        const bookID = new ObjectId(req.params.id);
        const book = fillBook(req.body.title, req.body.authors, req.body.publishing, req.body.language, req.body.genres);
        const response = await mongodb.getDB().db('library').collection('fav_books').replaceOne({_id: bookID}, book);
        console.log(response);
        res.status(204).send();
    } catch (err) {
        res.status(500).send({message: `Book could not be updated due to an error.`});
        next(err);
    }
};

//update a book title only
const updateTitle = async (req, res, next) => {
    // #swagger.description = 'Update only a title based on the listing ID'
    try {
        if (!req.body.title) {
            res.status(400).send({message: 'Field must have content'});
            return;
        }
        const bookID = new ObjectId(req.params.id);
        const newTitle = req.body.title;
        const response = await mongodb.getDB().db('library').collection('fav_books').updateOne({_id: bookID}, {$set:{title: newTitle}});
        console.log(response);
        res.status(204).send();
    } catch (err) {
        res.status(500).send({message: `Title could not be updated due to an error.`});
        next(err);
    }
};

//delete a book listing
const delBook = async (req, res, next) => {
    // #swagger.description = 'Delete whole book listing based on ID'
    try {
        const bookID = new ObjectId(req.params.id);
        const response = await mongodb.getDB().db('library').collection('fav_books').deleteOne({_id: bookID}, true);
        console.log(response);
        res.status(200).send();
    } catch (err) {
        res.status(500).send({message: `Book could not be deleted due to an error.`});
        next(err);
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

//experimental functions
function fillBook(bTitle, auth, pub, lang, genres) {
    return {
        title: bTitle,
        authors: auth,
        publishing: pub,
        language: lang,
        genres: genres
    };
}

module.exports = {getBooks, postBook, updateBook, updateTitle, delBook};