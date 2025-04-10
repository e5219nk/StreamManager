// app/about/page.tsx
'use client';

import Link from 'next/link';
import { FaXTwitter, FaYoutube, FaTiktok } from 'react-icons/fa6';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-sky-500 to-cyan-400 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-6">
          🐾 配信者プロフィール
        </h1>

        {/* 自己紹介 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">🖊 自己紹介</h2>
          <p className="text-lg leading-relaxed">
            こんにちは！ぷに子です🐾<br />
            ゲーム配信をメインにゆる～く配信してます。<br />
            ファンマは「足跡🐾」
          </p>
        </section>

        {/* グッズ */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">🎁 オリジナルグッズ</h2>
          <p className="mb-2">ぷに子のオリジナルグッズを販売中！</p>
          <a
            href="https://yourshop.booth.pm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition"
          >
            🛒 グッズショップへ
          </a>
        </section>

        {/* お問い合わせ */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">📬 お問い合わせ</h2>
          <p className="mb-2">お仕事のご依頼などはこちらへ：</p>
          <a
            href="mailto:yourmail@example.com"
            className="underline hover:text-yellow-200"
          >
            yourmail@example.com
          </a>
        </section>

        {/* SNS */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">🌐 SNS</h2>
          <div className="flex gap-6 text-3xl">
            <a href="https://x.com/Mlaurel8" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaXTwitter />
            </a>
            <a href="https://www.youtube.com/@punico_00" target="_blank" rel="noopener noreferrer" className="hover:text-pink-200">
              <FaYoutube  />
            </a>
            <a href="https://www.tiktok.com/@punico_00" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTiktok />
            </a>
          </div>
        </section>

        {/* トップへ */}
        <div className="text-center pt-6">
          <Link href="/" className="text-white underline hover:text-gray-200">
            ⬅️ トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
