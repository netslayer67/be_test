const Member = require('../models/member');
const Book = require('../models/book');

const getAllMembers = async () => {
    try {
        const members = await Member.find({}).populate('books').lean();
        return members;
    } catch (error) {
        throw new Error('Failed to fetch members from the database');
    }
};

const getMemberById = async (memberId) => {
    try {
        const member = await Member.findById(memberId).populate('books').lean();
        return member;
    } catch (error) {
        throw new Error('Failed to fetch member from the database');
    }
};

const createMember = async (memberData) => {
    try {
        const member = await Member.create(memberData);
        return member;
    } catch (error) {
        throw new Error('Failed to create member');
    }
};

const updateMember = async (memberId, memberData) => {
    try {
        const member = await Member.findByIdAndUpdate(memberId, memberData, { new: true });
        return member;
    } catch (error) {
        throw new Error('Failed to update member');
    }
};

const deleteMember = async (memberId) => {
    try {
        const member = await Member.findByIdAndDelete(memberId);
        if (!member) {
            throw new Error('Member not found');
        }
    } catch (error) {
        throw new Error('Failed to delete member');
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

        // Set dateBorrow and batas_peminjaman
        const currentDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7);

        member.dateBorrow = currentDate;
        member.batas_peminjaman = returnDate;

        await Promise.all([member.save(), book.save()]);

        return { success: true, book };
    } catch (error) {
        console.error(error); // Tampilkan pesan kesalahan secara detail pada konsol
        throw new Error('Failed to borrow book');
    }
};

const returnBook = async (memberId, bookId) => {
    try {
        const member = await Member.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member) {
            throw new Error('Member not found');
        }

        if (!book) {
            throw new Error('Book not found');
        }

        const bookIndex = member.books.findIndex((borrowedBook) => borrowedBook.equals(bookId));

        if (bookIndex === -1) {
            throw new Error('The member did not borrow the book');
        }

        member.books.splice(bookIndex, 1);

        if (member.books.length === 0) {
            member.penalty = false;
            member.penaltyDate = null;
            member.dateBorrow = null;
            member.batas_peminjaman = null;
        }

        book.stock += 1;

        await Promise.all([member.save(), book.save()]);
    } catch (error) {
        console.error(error); // Tampilkan pesan kesalahan secara detail pada konsol
        throw new Error('Failed to return book');
    }
};

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    borrowBook,
    returnBook,
};
