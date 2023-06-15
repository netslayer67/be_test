const express = require('express');
const memberController = require('../controllers/memberController');
const checkPenalty = require('../middlewares/checkPenalty');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for members
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Member code
 *               name:
 *                 type: string
 *                 description: Member name
 *           example:
 *             code: "M003"
 *             name: "Putri"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Member code
 *                 name:
 *                   type: string
 *                   description: Member name
 *                 books:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of book IDs
 *                 dateBorrow:
 *                   type: string
 *                   format: date-time
 *                   description: Date of borrowing a book
 *                 batas_peminjaman:
 *                   type: string
 *                   format: date-time
 *                   description: Due date for returning the book
 *                 penalty:
 *                   type: boolean
 *                   description: Penalty status
 *                 penaltyDate:
 *                   type: string
 *                   format: date-time
 *                   description: Date of penalty
 *                 _id:
 *                   type: string
 *                   description: Member ID
 *                 __v:
 *                   type: number
 *                   description: Version key
 *             example:
 *               code: "M003"
 *               name: "Putri"
 *               books: []
 *               dateBorrow: null
 *               batas_peminjaman: null
 *               penalty: false
 *               penaltyDate: null
 *               _id: "6489ef9c0b0144d3194a1253"
 *               __v: 0
 */
router.route('/')
    .get(memberController.getAllMembers)
    .post(memberController.createMember);

/**
 * @swagger
 * /members/{memberId}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Member not found
 *       500:
 *         description: Failed to fetch members
 *   patch:
 *     summary: Update a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Member not found
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Member not found
 */
router.route('/:memberId')
    .get(memberController.getMemberById)
    .patch(memberController.updateMember)
    .delete(memberController.deleteMember);

/**
 * @swagger
 * /members/{memberId}/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the member
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to borrow
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: ID of the member
 *               bookId:
 *                 type: string
 *                 description: ID of the book to borrow
 *             example:
 *               memberId: "6489ef810b0144d3194a1251"
 *               bookId: "6489f1bb0b0144d3194a1261"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 book:
 *                   $ref: '#/components/schemas/Book'
 *             example:
 *               message: "The book was successfully borrowed"
 *               book:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *             example:
 *               message: "Member has reached the maximum borrowing limit"       
 *       404:
 *         description: Member or book not found
 *       500:
 *         description: Failed to borrow book
 */



router.post('/:memberId/borrow/:bookId', checkPenalty, memberController.borrowBook);

/**
 * @swagger
 * /members/{memberId}/return/{bookId}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the member
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to return
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *                 description: ID of the member
 *               bookId:
 *                 type: string
 *                 description: ID of the book to return
 *             example:
 *               memberId: "6489ef810b0144d3194a1251"
 *               bookId: "6489f1bb0b0144d3194a1261"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *             example:
 *               message: "The book was successfully returned"
 *       400:
 *         description: Failed to return book
 *       404:
 *         description: Member or book not found
 */

router.post('/:memberId/return/:bookId', memberController.returnBook);

module.exports = router;
