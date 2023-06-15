const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    dateBorrow: { type: Date, default: null },
    batas_peminjaman: { type: Date, default: null },
    penalty: { type: Boolean, default: false },
    penaltyDate: { type: Date, default: null },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
