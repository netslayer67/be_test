const Book = require('../models/book');
const Member = require('../models/member');

const getAllBooks = async () => {
    try {
        const books = await Book.find({}).lean();
        return books;
    } catch (error) {
        throw new Error('Failed to fetch books from the database');
    }
};

const getBookById = async (bookId) => {
    try {
        const book = await Book.findById(bookId).lean();
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        throw new Error('Failed to fetch the book');
    }
};

const createBook = async (bookData) => {
    try {
        const book = new Book(bookData);
        await book.save();
        return book;
    } catch (error) {
        throw new Error('Failed to create a book');
    }
};

const updateBook = async (bookId, updatedData) => {
    try {
        const book = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }).lean();
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        throw new Error('Failed to update the book');
    }
};

const deleteBook = async (bookId) => {
    try {
        const book = await Book.findByIdAndDelete(bookId).lean();
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        throw new Error('Failed to delete the book');
    }
};

const borrowBook = async (memberId, bookId) => {
    try {
        const member = await Member.findById(memberId).populate('books').exec();
        const book = await Book.findById(bookId);

        if (!member) {
            throw new Error('Member not found');
        }

        if (!book) {
            throw new Error('Book not found');
        }

        if (member.penalty) {
            throw new Error('You are currently penalized. Please wait until the penalty ends.');
        }

        if (member.books.length >= 2) {
            throw new Error('Member has reached the maximum borrowing limit');
        }

        if (book.stock === 0) {
            throw new Error('The book is currently not available');
        }

        const isBookBorrowed = member.books.find((borrowedBook) => borrowedBook._id.toString() === bookId);

        if (isBookBorrowed) {
            throw new Error('The book is already borrowed by the member');
        }

        member.books.push(book);
        book.stock -= 1;

        await Promise.all([member.save(), book.save()]);

        return { success: true, book };
    } catch (error) {
        throw error;
    }
};



const returnBook = async (memberId, bookId) => {
    try {
        const member = await Member.findById(memberId).populate('books').exec();
        const book = await Book.findById(bookId);

        if (!member) {
            throw new Error('Member not found');
        }

        if (!book) {
            throw new Error('Book not found');
        }

        const isBookBorrowed = member.books.find((borrowedBook) => borrowedBook._id.toString() === bookId);

        if (!isBookBorrowed) {
            throw new Error('The book is not borrowed by the member');
        }

        member.books = member.books.filter((borrowedBook) => borrowedBook._id.toString() !== bookId);
        book.stock += 1;

        const borrowedDate = isBookBorrowed.createdAt;
        const returnDate = new Date();

        const timeDiff = returnDate.getTime() - borrowedDate.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (diffDays > 7) {
            member.penalty = true;
            member.penaltyDate = returnDate;
        }

        await Promise.all([member.save(), book.save()]);

        return { success: true, book, diffDays };
    } catch (error) {
        throw new Error('Failed to return the book');
    }
};

const checkAvailableBooks = async () => {
    try {
        const borrowedBooks = await Member.aggregate([
            { $unwind: '$books' },
            { $group: { _id: '$books', count: { $sum: 1 } } },
        ]);

        const books = await Book.find({}).lean();

        const availableBooks = books.map((book) => {
            const borrowedBook = borrowedBooks.find((borrowed) => borrowed._id.toString() === book._id.toString());

            if (borrowedBook) {
                return {
                    ...book,
                    stock: book.stock - borrowedBook.count,
                };
            }

            return book;
        });

        return availableBooks;
    } catch (error) {
        throw new Error('Failed to fetch available books');
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    checkAvailableBooks,
};
