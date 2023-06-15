const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// router.get('/', bookController.getAllBooks);
// router.post('/', bookController.createBook);
// router.get('/:bookId', bookController.getBookById);
// router.patch('/:bookId', bookController.updateBook);
// router.delete('/:bookId', bookController.deleteBook);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Code of the book
 *               title:
 *                 type: string
 *                 description: Title of the book
 *               author:
 *                 type: string
 *                 description: Author of the book
 *               stock:
 *                 type: number
 *                 description: Stock of the book
 *             example:
 *               code: "NRN-7"
 *               title: "The Lion, the Witch and the Wardrobe"
 *               author: "C.S. Lewis"
 *               stock: 1
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Code of the book
 *                 title:
 *                   type: string
 *                   description: Title of the book
 *                 author:
 *                   type: string
 *                   description: Author of the book
 *                 stock:
 *                   type: number
 *                   description: Stock of the book
 *                 _id:
 *                   type: string
 *                   description: ID of the book
 *                 __v:
 *                   type: number
 *                   description: Version of the book
 *             example:
 *               code: "NRN-7"
 *               title: "The Lion, the Witch and the Wardrobe"
 *               author: "C.S. Lewis"
 *               stock: 1
 *               _id: "648a81333f88e2779370fe14"
 *               __v: 0
 */
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Book not found
 * 
 *   patch:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Book not found
 * 
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Book not found
 */
router.get('/:bookId', bookController.getBookById);
router.patch('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;

