'use client'

import { useState, useEffect } from 'react';

const InputForm = () => {
  const [listeners, setListeners] = useState<{ ListenerID: number; name: string }[]>([]);
  const [selectedListener, setSelectedListener] = useState<number | string>('');
  const [coinAmount, setCoinAmount] = useState<number>(0);
  const [streamDate, setStreamDate] = useState<string>('');

  // リスナー一覧を取得
  useEffect(() => {
    const fetchListeners = async () => {
      try {
        const response = await fetch('/api/listeners');
        if (!response.ok) throw new Error('Failed to fetch listeners');
        const data = await response.json();
        console.log("取得したリスナー一覧:", data); // デバッグ用ログ
        
        // 名前順にソート (A→Z, あ→ん順)
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
        setListeners(sortedData);
      } catch (error) {
        console.error("リスナー取得エラー:", error);
      }
    };
    fetchListeners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedListener === '' || isNaN(Number(selectedListener))) {
      alert("リスナーを選択してください");
      return;
    }

    try {
      const response = await fetch('/api/record-donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listenerId: Number(selectedListener), // 数値型に変換
          coinAmount,
          streamDate,
        }),
      });

      if (response.ok) {
        alert('投げ銭データが記録されました！');
      } else {
        throw new Error('データ保存に失敗しました。');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="streamDate" className="block text-gray-700">配信日</label>
        <input
          type="date"
          id="streamDate"
          value={streamDate}
          onChange={(e) => setStreamDate(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="listener" className="block text-gray-700">リスナー</label>
        <select
          id="listener"
          value={selectedListener}
          onChange={(e) => setSelectedListener(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">リスナーを選択</option>
          {listeners.length > 0 ? (
            listeners.map((listener) => (
              <option key={listener.ListenerID} value={listener.ListenerID}>
                {listener.name}
              </option>
            ))
          ) : (
            <option disabled>リスナーが見つかりません</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="coinAmount" className="block text-gray-700">投げ銭コイン数</label>
        <input
          type="number"
          id="coinAmount"
          value={coinAmount}
          onChange={(e) => setCoinAmount(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        保存
      </button>
    </form>
  );
};

export default InputForm;
