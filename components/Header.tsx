import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-filipino-red text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl">🥘</span>
          <div>
            <h1 className="text-2xl font-bold font-serif leading-tight">Rolando Kusina</h1>
            <p className="text-xs text-red-200 font-medium tracking-wider uppercase">100 Authentic Filipino Flavors</p>
          </div>
        </div>
        <div className="hidden md:block text-sm text-red-100 italic">
          "Ang hindi marunong lumingon sa pinanggalingan, hindi makakarating sa paroroonan."
        </div>
      </div>
    </header>
  );
};