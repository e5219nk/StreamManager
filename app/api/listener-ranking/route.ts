// ================================
// ✅ API (Listener Ranking)
// ================================
import { NextResponse } from 'next/server';
import sql from 'mssql';

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

export async function GET(req: Request) {
  try {
    // リクエストのURLを確認
    console.log("📡 リクエストURL:", req.url);

    const url = new URL(req.url);

    // URLの中身を確認
    console.log("📊 URLオブジェクト:", url);

    const monthParam = url.searchParams.get("month");

    // 月のパラメータを確認
    console.log("📊 選択している月情報:", monthParam);
    
    if (!monthParam) {
      return NextResponse.json({ error: "月が指定されていません。" }, { status: 400 });
    }

    const [year, month] = monthParam.split("-").map(Number);
    console.log("📅 年と月の分割結果:", year, month); // 年と月の値を確認

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("year", sql.Int, year)
      .input("month", sql.Int, month)
      .query(`
        SELECT l.name AS Name, SUM(d.CoinAmount) AS totalCoins
        FROM Donations d
        JOIN Listeners l ON d.ListenerID = l.ListenerID
        WHERE YEAR(d.StreamDate) = '2025' AND MONTH(d.StreamDate) = '04'
        GROUP BY l.name
        ORDER BY totalCoins DESC
      `);

    console.log("🔥 正しいランキングデータ:", result.recordset);
    return NextResponse.json({ [monthParam]: result.recordset });
  } catch (error) {
    // エラーログの詳細を出力
    console.error("ランキング取得エラー:", error);
    return NextResponse.json({ error: "ランキング取得に失敗しました。" }, { status: 500 });
  }
}

