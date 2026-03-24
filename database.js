import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'db_express_mysql',
    password: "amantaruna20",
});

export default connection