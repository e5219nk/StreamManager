'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center">
      {/* Y軸でくるくる回るアイコン */}
      <div className="w-32 h-32 perspective">
        <div className="w-full h-full relative animate-rotateY">
          <Image
            src="/icon.png" // ← 実際のアイコンに合わせて変更
            alt="App Icon"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* タイトル */}
      <header className={`w-full text-center font-bold transition-all ${isScrolled ? 'py-3 text-xl' : 'py-6 text-3xl'}`}>
        投げ銭管理アプリ
      </header>

      {/* メニューリンク */}
      <nav className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-4/5 max-w-3xl">
        <Link href="/input" className="bg-gray-800 shadow-md rounded-xl p-6 text-center text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all">
          投げ銭入力フォーム
        </Link>
        <Link href="/dashboard" className="bg-gray-800 shadow-md rounded-xl p-6 text-center text-lg font-semibold hover:bg-green-500 hover:text-white transition-all">
          ダッシュボード
        </Link>
        <Link href="/listeners" className="bg-gray-800 shadow-md rounded-xl p-6 text-center text-lg font-semibold hover:bg-purple-500 hover:text-white transition-all">
          リスナー登録
        </Link>
        <Link href="/topics" className="bg-gray-800 shadow-md rounded-xl p-6 text-center text-lg font-semibold hover:bg-yellow-500 hover:text-white transition-all">
          固定質問＆話題ガチャ
        </Link>
        <Link href="/about" className="bg-gray-800 shadow-md rounded-xl p-6 text-center text-lg font-semibold hover:bg-pink-500 hover:text-white transition-all">
          プロフィール / グッズ紹介
        </Link>
      </nav>
    </div>
  );
}
