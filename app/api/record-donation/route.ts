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

export async function POST(req: Request) {
  const { listenerId, coinAmount, streamDate } = await req.json();
  
  if (!listenerId || !coinAmount || !streamDate) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const pool = await new ConnectionPool(config).connect();
    await pool
      .request()
      .input('ListenerID', listenerId)
      .input('CoinAmount', coinAmount)
      .input('StreamDate', streamDate)
      .query(`
        INSERT INTO Donations (ListenerID, CoinAmount, StreamDate)
        VALUES (@ListenerID, @CoinAmount, @StreamDate)
      `);
    
    return NextResponse.json({ message: '投げ銭データが記録されました！' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'データ保存に失敗しました' }, { status: 500 });
  }
}
