const bookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books' });
    }
};

const borrowBook = async (req, res) => {
    const { memberId, bookId } = req.body; // Ubah urutan kunci properti menjadi "memberId" dan "bookId"
    try {
        const result = await bookService.borrowBook(memberId, bookId); // Ubah urutan argumen menjadi "memberId" dan "bookId"
        if (result.success) {
            res.json({ message: 'The book was successfully borrowed', book: result.book });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to borrow the book' });
    }
};

const returnBook = async (req, res) => {
    const { bookId, memberId } = req.body;
    try {
        const result = await bookService.returnBook(bookId, memberId);
        if (result.success) {
            res.json({ message: 'The book was successfully returned', book: result.book });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to return the book' });
    }
};

const checkAvailableBooks = async (req, res) => {
    try {
        const availableBooks = await bookService.checkAvailableBooks();
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch available books' });
    }
};

const createBook = async (req, res) => {
    try {
        const bookData = req.body;
        const book = await bookService.createBook(bookData);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create a book' });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await bookService.getBookById(bookId);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the book' });
    }
};

const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updatedData = req.body;
        const book = await bookService.updateBook(bookId, updatedData);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update the book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await bookService.deleteBook(bookId);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the book' });
    }
};

module.exports = {
    getAllBooks,
    borrowBook,
    returnBook,
    checkAvailableBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
};
