'use client';

import React, { useState, useEffect } from 'react';

interface Tab {
  id: number;
  title: string;
  content: string;
}

export default function HomeTabsGenerator() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [outputCode, setOutputCode] = useState('');
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tabsData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTabs(parsed);
      if (parsed.length > 0) setActiveTab(parsed[0].id);
    } else {
      const initial = [{ id: 1, title: 'Tab 1', content: 'Welcome to Tab 1 content' }];
      setTabs(initial);
      setActiveTab(1);
      localStorage.setItem('tabsData', JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabsData', JSON.stringify(tabs));
  }, [tabs]);

  const addTab = () => {
    if (tabs.length >= 15) {
      alert('Maximum of 15 tabs reached.');
      return;
    }
    const newId = tabs.length ? tabs[tabs.length - 1].id + 1 : 1;
    const newTab = { id: newId, title: `Tab ${newId}`, content: `This is Tab ${newId} content.` };
    const updated = [...tabs, newTab];
    setTabs(updated);
    setActiveTab(newId);
  };

  const removeTab = (id: number) => {
    const updated = tabs.filter((t) => t.id !== id);
    setTabs(updated);
    if (activeTab === id && updated.length > 0) {
      setActiveTab(updated[0].id);
    } else if (updated.length === 0) {
      setActiveTab(null);
    }
  };

  const updateTitle = (id: number, value: string) => {
    setTabs(tabs.map((t) => (t.id === id ? { ...t, title: value } : t)));
  };

  const updateContent = (id: number, value: string) => {
    setTabs(tabs.map((t) => (t.id === id ? { ...t, content: value } : t)));
  };

  const generateOutput = () => {
    const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Generated Tabs</title>
<style>
  body { font-family: Arial; padding: 20px; }
  .tab { display: inline-block; padding: 8px 12px; background: #eee; border: 1px solid #ccc; margin-right: 4px; cursor: pointer; }
  .tab.active { background: #ccc; }
  .tab-content { margin-top: 10px; border: 1px solid #ccc; padding: 10px; }
</style>
<script>
  function showTab(i) {
    var contents = document.querySelectorAll('.tab-content');
    var tabs = document.querySelectorAll('.tab');
    contents.forEach((c, idx) => {
      c.style.display = idx === i ? 'block' : 'none';
    });
    tabs.forEach((t, idx) => {
      t.classList.toggle('active', idx === i);
    });
  }
</script>
</head>
<body>
  <div>
    ${tabs
      .map(
        (t, i) =>
          `<div class="tab" onclick="showTab(${i})">${t.title}</div>`
      )
      .join('')}
  </div>
  ${tabs
    .map(
      (t, i) =>
        `<div class="tab-content" style="display:${i === 0 ? 'block' : 'none'}">${t.content}</div>`
    )
    .join('')}
</body>
</html>
    `.trim();

    setOutputCode(htmlCode);
  };

  return (
    <section className="container">
      <h1 className="page-title">Tabs Generator</h1>
      <p>
        Create up to <strong>15 tabs</strong>. You can double-click a tab to rename it, edit its content, and export
        HTML + JS code with inline CSS.
      </p>

      <div style={{ margin: '16px 0', display: 'flex', gap: '10px' }}>
        <button
          onClick={addTab}
          style={{
            background: '#0b5cff',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#0843b7')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#0b5cff')}
        >
          + Add Tab
        </button>

        <button
          onClick={() => {
            if (activeTab !== null) removeTab(activeTab);
          }}
          disabled={tabs.length === 0}
          style={{
            background: tabs.length === 0 ? '#aaa' : '#d9534f',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: tabs.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (tabs.length > 0) e.currentTarget.style.background = '#b52b27';
          }}
          onMouseOut={(e) => {
            if (tabs.length > 0) e.currentTarget.style.background = '#d9534f';
          }}
        >
          – Remove Tab
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            onDoubleClick={() => setEditingTitleId(t.id)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              background: activeTab === t.id ? '#ccc' : '#eee',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {editingTitleId === t.id ? (
              <input
                type="text"
                value={t.title}
                onChange={(e) => updateTitle(t.id, e.target.value)}
                onBlur={() => setEditingTitleId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingTitleId(null);
                }}
                autoFocus
                style={{
                  fontSize: '1rem',
                  border: '1px solid #999',
                  borderRadius: '4px',
                  padding: '2px 6px',
                }}
              />
            ) : (
              <span>{t.title}</span>
            )}
          </div>
        ))}
      </div>

      {activeTab && (
        <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '6px' }}>
          {tabs
            .filter((t) => t.id === activeTab)
            .map((t) => (
              <div key={t.id}>
                <strong>Content:</strong>
                <textarea
                  value={t.content}
                  onChange={(e) => updateContent(t.id, e.target.value)}
                  rows={6}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    padding: '8px',
                    resize: 'vertical',
                  }}
                />
              </div>
            ))}
        </div>
      )}

      <div style={{ marginTop: '16px' }}>
        <button
          onClick={generateOutput}
          disabled={tabs.length === 0}
          style={{
            padding: '8px 16px',
            background: tabs.length === 0 ? '#aaa' : '#0b5cff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: tabs.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={(e) => {
            if (tabs.length > 0) e.currentTarget.style.background = '#0843b7';
          }}
          onMouseOut={(e) => {
            if (tabs.length > 0) e.currentTarget.style.background = '#0b5cff';
          }}
        >
          Generate Output Code
        </button>
      </div>

      {outputCode && (
        <div style={{ marginTop: '20px' }}>
          <h2>Output HTML:</h2>
          <textarea
            value={outputCode}
            readOnly
            rows={14}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              background: '#f8f8f8',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '8px',
            }}
          />
          <p style={{ fontSize: '0.9rem', color: '#555' }}>
            Copy this code into a new file called <strong>Hello.html</strong> and open it in your browser.
          </p>
        </div>
      )}
    </section>
  );
}
