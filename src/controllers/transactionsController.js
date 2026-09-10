import { sql } from '../config/db.js'
export async function getTransactionsByUserId(req, res) {
    try {
        const { Id } = req.params;
        const results = await sql`select * from transactions where user_id=${Id} order by id desc`;
        res.status(200).json(results)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createTransaction(req, res) {
    try {
        const { user_id, title, amount, category } = req.body;
        if (!user_id || !title || amount === undefined || !category) {
            res.status(400).json({ message: "All fields are required." });
        }
        const transaction = await sql`insert into transactions(user_id,title, amount, category) values(${user_id},${title},${amount},${category}) returning *`;
        res.status(201).json(transaction[0])
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { Id } = await req.params;
        const result = await sql`DELETE from transactions WHERE user_id=${Id} RETURNING *`
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.send(500).json(error)
    }
}

export async function getSummaryByUserId(req, res) {
    try {
        const { Id } = await req.params;
        const balanceResult = await sql`select COALESCE(SUM(amount),0) as balance from transactions where user_id=${Id}`
        const totalBalance = balanceResult[0].balance;
        const incomeResult = await sql`select COALESCE(SUM(amount),0) as income from transactions where user_id=${Id} and amount>0`
        const incomeBalance = incomeResult[0].income;
        const expencesResult = await sql`select COALESCE(SUM(amount),0) as expence from transactions where user_id=${Id} and amount<0`
        const expenceBalance = expencesResult[0].expence;
        res.status(200).json({
            balance: totalBalance,
            income: incomeBalance,
            expence: expenceBalance
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}