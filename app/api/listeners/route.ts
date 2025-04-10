import { NextResponse } from 'next/server';
import sql from 'mssql';

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

// グローバルな接続プールを作成（既存のプールを再利用）
let poolPromise: Promise<sql.ConnectionPool> | null = null;
async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}

// **リスナー一覧を取得**
export async function GET() {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT ListenerID, name FROM Listeners');

    console.log("取得したリスナー一覧:", result.recordset);

    return NextResponse.json(result.recordset ?? []); // NULL の場合でも空配列を返す
  } catch (error) {
    console.error('DB接続エラー:', error);
    return NextResponse.json([]); // エラー時も空配列を返す
  }
}

// **リスナーを登録**
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const pool = await getPool();
    await pool.request().input('name', sql.NVarChar, name).query('INSERT INTO Listeners (name) VALUES (@name)');
    
    // 登録直後のデータを取得
    const result = await pool.request().query('SELECT TOP 1 ListenerID, name FROM Listeners ORDER BY ListenerID DESC');

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: '登録データの取得に失敗しました' }, { status: 500 });
    }

    console.log("登録されたリスナー:", result.recordset[0]);

    return NextResponse.json(result.recordset[0]); // 新規登録リスナーを返す
  } catch (error) {
    console.error('登録エラー:', error);
    return NextResponse.json({ error: '登録に失敗しました。' }, { status: 500 });
  }
}
