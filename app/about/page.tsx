'use client';

import React from 'react';

export default function AboutPage() {
  const name = 'Stephanie Valerie The';
  const studentNumber = '22586667'; // 
  return (
    <section className="container">
      <h1 className="page-title">About</h1>

      <p><strong>Name:</strong> {name}</p>
      <p><strong>Student Number:</strong> {studentNumber}</p>

      <h2>Cloud Based Web Application - Assignment 1</h2>
      <p>
        This is my assignment video regarding the fundamental aspects that requires my in depth explanation <code>Hello.html</code>.
      </p>

      <div className="video-placeholder" role="region" aria-label="Video demonstration">
        <p>Video demonstration goes here (record and embed your screen + face + audio when you submit).</p>
      </div>
    </section>
  );
}
