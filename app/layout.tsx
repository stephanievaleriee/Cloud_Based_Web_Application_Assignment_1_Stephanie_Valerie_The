'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const STUDENT_NUMBER = 'LTU Student ID: 22586667'; 
  const STUDENT_NAME = 'Stephanie Valerie The';

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedTab = localStorage.getItem('activeTab');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
    if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <html lang="en">
      <body className="page-body">
        <header className="site-header" role="banner">
          <div className="header-left">
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((s) => !s)}
            >
              <span className="hamburger-icon" aria-hidden="true">☰</span>
            </button>

            <div className="student-number" title="Student number">
              {STUDENT_NUMBER}
            </div>
          </div>

          <nav
            id="main-navigation"
            className={`nav ${menuOpen ? 'show' : ''}`}
            role="navigation"
            aria-label="Primary"
          >
            <ul className="nav-list" role="tablist" aria-orientation="horizontal">
              <li role="presentation">
                <Link
                  href="/"
                  onClick={() => navigateTo('home')}
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'home'}
                >
                  Home (Tabs Generator)
                </Link>
              </li>

              <li role="presentation">
                <Link
                  href="/about"
                  onClick={() => navigateTo('about')}
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'about'}
                >
                  About
                </Link>
              </li>

              <li role="presentation">
                <Link
                  href="/escape-room"
                  onClick={() => navigateTo('escape')}
                  className={`nav-link ${activeTab === 'escape' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'escape'}
                >
                  Escape Room
                </Link>
              </li>

              <li role="presentation">
                <Link
                  href="/coding-races"
                  onClick={() => navigateTo('coding')}
                  className={`nav-link ${activeTab === 'coding' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'coding'}
                >
                  Coding Races
                </Link>
              </li>

              <li role="presentation">
                <Link
                  href="/court-room"
                  onClick={() => navigateTo('court')}
                  className={`nav-link ${activeTab === 'court' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === 'court'}
                >
                  Court Room
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-right">
            <button
              className="theme-toggle"
              aria-label="Toggle dark or light mode"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </header>

        <main id="content" role="main" className="main-content">
          {children}
        </main>

        <footer className="site-footer" role="contentinfo">
          <div>
            © {new Date().getFullYear()} {STUDENT_NAME} | Student #{STUDENT_NUMBER} | {new Date().toLocaleDateString()}
          </div>
        </footer>
      </body>
    </html>
  );
}
