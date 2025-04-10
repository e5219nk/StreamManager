import { NextResponse } from 'next/server';
import { ConnectionPool } from 'mssql';

// SQL Serverの接続設定
const config = {
  user: 'sa',
  password: 'fish',
  server: 'localhost',
  database: 'master',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function GET() {
  try {
    const pool = await new ConnectionPool(config).connect();
    const result = await pool.request().query(`
      SELECT 
        FORMAT(StreamDate, 'yyyy-MM') AS month,
        SUM(CoinAmount) AS totalCoins
      FROM Donations
      GROUP BY FORMAT(StreamDate, 'yyyy-MM')
      ORDER BY month DESC
    `);
    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'データ取得に失敗しました' }, { status: 500 });
  }
}
