'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { JournalSchema } from '@core/journal.schema';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function JournalForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(null);

  const submit = async () => {
    const parse = JournalSchema.safeParse({ content });
    if (!parse.success) {
      alert('Please write something.');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setJournalId(data.id);
    setContent('');
    setLoading(false);
  };

  return (
    <div>
      <textarea
        className="w-full h-40 p-2 rounded border"
        placeholder="Write your day..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={submit}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save journal'}
      </button>
      {journalId && (
        <p className="mt-2 text-sm text-green-700">
          Saved! Worker will extract tasks shortly.
        </p>
      )}
    </div>
  );
}
