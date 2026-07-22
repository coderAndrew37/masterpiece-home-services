import React from 'react';

export default function Loading(): React.JSX.Element {
  return (
    <div className="min-h-[70vh] w-full bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-700 animate-spin" />
        
        {/* Inner Glowing Orb */}
        <div className="absolute w-8 h-8 bg-blue-600/20 rounded-full animate-pulse" />
      </div>

      <p className="text-slate-600 font-bold text-xs uppercase tracking-widest mt-6 animate-pulse">
        Loading Masterpiece Home Services...
      </p>
    </div>
  );
}