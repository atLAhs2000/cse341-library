const mongodb = require('../DB/connection');

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
    // #swagger.description = 'post one book with information'
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
}

/* POST format for books

{
    "title": "",
    "authors": [],
    "publishing": "",
    "language": "",
    "genres": []
}

*/

module.exports = {getBooks, postBook};