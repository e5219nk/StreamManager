"use client";

import { useState, useEffect } from "react";

export default function Listeners() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [listeners, setListeners] = useState<any[]>([]);

  useEffect(() => {
    // 既存のリスナー情報をAPIから取得
    const fetchListeners = async () => {
      const response = await fetch("/api/listeners");
      const data = await response.json();
      console.log(data);  // listenersのデータを確認
      setListeners(data);
    };

    fetchListeners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/listeners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      setMessage("リスナーを登録しました！");
      setName("");
      // 新規リスナーを追加して表示を更新
      const data = await response.json();
      setListeners((prevListeners) => [...prevListeners, data]);
    } else {
      setMessage("登録に失敗しました。");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">リスナー登録</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="リスナー名"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          登録
        </button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}

      <h2 className="mt-4 text-xl">登録済みリスナー一覧</h2>
      <ul className="mt-2">
        {listeners.map((listener, index) => (
          <li key={listener.id || listener.name || index} className="border-b py-2">
            {listener.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
