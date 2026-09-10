import express from 'express'
import dotenv from 'dotenv'
import { initDB } from './config/db.js';
import rateLimit from './middleware/rateLimiter.js';
import transactionRoutes from './routes/transactionsRoutes.js'
dotenv.config();

const app = express();
const port = process.env.port;

// middleware
app.use(express.json());
app.use(rateLimit);
app.use('/api/transaction', transactionRoutes)

app.get('/', (req, res) => {
    res.send('hello world')
})

initDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
})

