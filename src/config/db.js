import dotenv from 'dotenv'
import { neon } from '@neondatabase/serverless'

dotenv.config()

export const sql = neon(process.env.DATABASE_URL);

// initalize the db
export async function initDB() {
    try {
        await sql`create table if not exists transactions(
        id serial primary key,
        user_id varchar(250) not null,
        title varchar(250) not null,
        amount decimal(10,2) not null,
        category varchar(250) not null,
        created_at date not null default now()
        )`;
        console.log('database initialize successfully');
    } catch (error) {
        console.error("Database initialization error: ", error);
        process.exit(1)
    }
}