const memberService = require('../services/memberService');

const getAllMembers = async (req, res) => {
    try {
        const members = await memberService.getAllMembers();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch members' });
    }
};

const getMemberById = async (req, res) => {
    const { memberId } = req.params;
    try {
        const member = await memberService.getMemberById(memberId);
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch member' });
    }
};

const createMember = async (req, res) => {
    const memberData = req.body;
    try {
        const member = await memberService.createMember(memberData);
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create member' });
    }
};

const updateMember = async (req, res) => {
    const { memberId } = req.params;
    const memberData = req.body;
    try {
        const member = await memberService.updateMember(memberId, memberData);
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update member' });
    }
};

const deleteMember = async (req, res) => {
    const { memberId } = req.params;
    try {
        await memberService.deleteMember(memberId);
        res.status(200).json({ message: 'Member Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete member' });
    }
};

const borrowBook = async (req, res) => {
    const { memberId, bookId } = req.params;
    try {
        const result = await memberService.borrowBook(memberId, bookId);
        res.status(200).json({ message: 'The book was successfully borrowed', book: result.book });
    } catch (error) {
        if (error.message === 'Member has reached the maximum borrowing limit' || error.message === 'The book is currently not available' || error.message === 'The book is already borrowed by the member') {
            res.status(400).json({ message: error.message });
        } else if (error.message === 'Member not found' || error.message === 'Book not found') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'You are currently penalized. Please wait until the penalty ends.') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Failed to borrow book' });
        }
    }
};


const returnBook = async (req, res) => {
    const { memberId, bookId } = req.params;
    try {
        await memberService.returnBook(memberId, bookId);
        res.status(200).json({ message: 'The book was successfully returned' });
    } catch (error) {
        if (error.message === 'Member not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Failed to return book' });
        }
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
