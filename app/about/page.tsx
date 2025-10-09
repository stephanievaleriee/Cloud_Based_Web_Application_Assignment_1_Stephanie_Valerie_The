'use client';

import React from 'react';

export default function AboutPage() {
  const STUDENT_NAME = 'Stephanie Valerie The';
  const STUDENT_NUMBER = '22586667';

  return (
    <section className="container">
      <h1 className="page-title">About</h1>
      <p>
        Hello! I’m <strong>{STUDENT_NAME}</strong> (Student ID: {STUDENT_NUMBER}). This project was developed as part of the
        assignment requirements to demonstrate UI design, dark/light mode, responsive navigation, and dynamic content
        generation using Next.js and React.
      </p>

      <div
        style={{
          marginTop: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          background: 'var(--background)',
        }}
      >
        <h3>Project Demonstration Video</h3>
        <p>You can watch my presentation video below:</p>

        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%', 
            height: 0,
            overflow: 'hidden',
            borderRadius: '8px',
            marginTop: '12px',
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/ONsz4YadZ9I"
            title="Project Presentation Video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
