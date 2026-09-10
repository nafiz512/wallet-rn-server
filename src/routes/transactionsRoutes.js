import express from 'express'
import { sql } from '../config/db.js';
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controllers/transactionsController.js';

const router = express.Router();

//create transaction 
router.post('/', createTransaction)
//get summary by user id
router.get('/summary/:Id', getSummaryByUserId)
// get specific transaction by userId
router.get('/:Id', getTransactionsByUserId)
// delete specific 
router.delete('/:Id', deleteTransaction)

export default router;