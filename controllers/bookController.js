const asyncHandler = require("express-async-handler");
var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');
exports.index = async function (req, res) {
    try {
        const [bookCount, authorCount, genreCount, bookInstanceCount] = await Promise.all([
            Book.countDocuments().exec(),
            Author.countDocuments().exec(),
            Genre.countDocuments().exec(),
            BookInstance.countDocuments().exec()
        ]);

        console.log('Book count:', bookCount);
        console.log('Author count:', authorCount);
        console.log('Genre count:', genreCount);
        console.log('BookInstance count:', bookInstanceCount);
        res.render('index', {
            title: 'Local Library Home', data: {
                book_count: bookCount,
                book_instance_count: bookInstanceCount,
                book_instance_available_count: bookInstanceCount,
                author_count: authorCount,
                genre_count: genreCount,
            }
        });
    } catch (error) {
        console.error('查询计数出错:', error);
    }
};

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
    var result = await Book.find({}, 'title author')
        .populate('author')
        .exec()
    res.render('book_list', { title: 'Book List', book_list: result });
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
    var [book, book_instance] = await Promise.all([Book.findById(req.params.id).populate('author').populate('genre').exec(), BookInstance.find({ 'book': req.params.id }).exec()])
    res.render('book_detail', { title: 'Title','book': book, 'book_instances': book_instance })
});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book update POST");
});
