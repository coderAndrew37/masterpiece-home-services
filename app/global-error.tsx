'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">System Error</h1>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              A critical application error occurred. Please try reloading the page.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}