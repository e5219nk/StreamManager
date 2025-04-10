"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full transition-all duration-300
            ${scroll ? "bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg shadow-gray-700/50 scale-95" : "bg-transparent"}`}>
            <nav className="max-w-5xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-white text-lg font-bold hover:animate-bounce">
                    投げ銭管理アプリ
                </h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-white transition-all hover:border-b-4 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/50">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/input" className="text-white transition-all hover:border-b-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/50">
                            投げ銭入力
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="text-white transition-all hover:border-b-4 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50">
                            ダッシュボード
                        </Link>
                    </li>
                    <li>
                        <Link href="/listeners" className="text-white transition-all hover:border-b-4 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/50">
                            リスナー登録
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
