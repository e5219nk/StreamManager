// app/topics/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = {
  雑談: [
    '最近ハマってることは？',
    '朝ごはん何食べた？',
    '今、行きたい場所は？',
    '最近のプチ幸せエピソードは？',
    '子供の頃の夢は？',
    '最近買ってよかったものは？',
    '今週の目標は？',
    '理想の休日の過ごし方は？',
    '地元のおすすめスポットは？',
    '最近笑ったことは？',
    '無人島に1つだけ持っていくなら？',
    '今、挑戦してみたいことは？',
    '宝くじが当たったらどうする？',
    '1日だけ別の職業になるなら何？',
    '最近のマイブームは？',
    '朝起きて一番最初にすることは？',
    '好きな季節は？その理由は？',
    '今年中にやりたいことは？',
    '好きな食べ物ランキングBEST3は？',
  ],
  恋愛: [
    '初恋の思い出は？',
    '理想のデートプランは？',
    '好きなタイプは？',
    '恋愛で一番大事にしてることは？',
    '告白する派？されたい派？',
    '付き合う上で譲れないことは？',
    '過去の恋愛で一番印象に残ってることは？',
    '遠距離恋愛ってどう思う？',
    '恋人にされたら嬉しいことは？',
    '理想の告白シチュエーションは？',
    '今までにもらった嬉しい言葉は？',
    '恋愛と結婚、どう違うと思う？',
    '浮気の境界線ってどこ？',
    '恋に落ちる瞬間って？',
    '好きな人に取る行動は？',
    '付き合ってわかった相手の意外な一面は？',
    '恋人と一緒にやりたいことリストは？',
  ],
  エンタメ: [
    '好きなアニメ・漫画は？',
    '最近見た映画は？',
    '推しの話を聞かせて！',
    '一番好きなゲームは？',
    '今ハマってるYouTubeチャンネルは？',
    'ライブ・フェスに行ったことある？',
    '昔よく見てたテレビ番組は？',
    '好きな声優・俳優さんは？',
    '一番感動した映画は？',
    '最強のアニメ主題歌は？',
    '好きなゲームジャンルは？',
    'おすすめの漫画アプリは？',
    '初めてハマった作品は？',
    '何度も見返したくなる作品は？',
    '配信で語りたい作品は？',
    '二次元で付き合うなら誰？',
    'アニメの中で住みたい世界は？',
  ],
};

export default function TopicsPage() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categories>('雑談');

  const handleGacha = () => {
    const list = categories[selectedCategory];
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrentTopic(random);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center"> 固定質問 & 話題ガチャ</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">🎲 話題ガチャ（カテゴリ選択）</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as keyof typeof categories)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleGacha}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            ガチャを回す
          </button>
          {currentTopic && (
            <p className="mt-4 text-lg font-medium bg-gray-800 p-4 rounded-xl border border-gray-600">
              💬 {currentTopic}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📌 固定質問（全カテゴリまとめ）</h2>
          <ul className="list-disc pl-6 space-y-1 text-base">
            {Object.values(categories)
              .flat()
              .map((q, i) => (
                <li key={i}>{q}</li>
              ))}
          </ul>
        </section>

        <div className="pt-8 text-center">
          <Link href="/" className="text-blue-400 underline hover:text-blue-200">
            ⬅️ トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
