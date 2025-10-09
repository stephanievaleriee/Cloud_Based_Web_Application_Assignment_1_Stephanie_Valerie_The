"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-sm">Student No: 12345678</div>

      <button
        className="md:hidden block text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block absolute md:static bg-gray-800 w-full md:w-auto left-0 top-12 md:top-auto p-4 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row gap-4 text-center">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
