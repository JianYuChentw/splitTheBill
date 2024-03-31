const mysql = require('mysql2/promise');
const config = require('../../config');

const pool = mysql.createPool({
  host: config.db.DB_HOST,
  user: config.db.DB_USER,
  password: config.db.DB_PASSWORD,
  database: config.db.DB_DATABASE,
  waitForConnections: config.db.DB_WAITFORCONNECTIONS,
  connectionLimit: config.db.DB_CONNECTIONLIMIT,
  queueLimit: config.db.DB_QUEUE,
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows, errors] = await conn.query(
      'select *from expense_categories limit 1'
    );
    conn.release();
    console.log('成功連線資料庫');
    await pool.end(); // 在連線成功建立後關閉連線
  } catch (error) {
    console.log('連線資料庫失敗');
    console.log(error.stack);
    if (conn) {
      conn.release(); // 確保釋放資源
    }
  }
}

module.exports = {
  pool,
};
