import React, { useState, useMemo } from 'react';
import { DISH_CATALOG } from './constants';
import { Category, DishSummary } from './types';
import { Header } from './components/Header';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';

const App: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<DishSummary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories for filter chips
  const categories = useMemo(() => {
    return ['All', ...Object.values(Category)];
  }, []);

  // Filter logic
  const filteredDishes = useMemo(() => {
    return DISH_CATALOG.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream text-gray-800">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        
        {/* Controls Section */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for Adobo, Sinigang, or Ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-orange-200 focus:border-filipino-red focus:ring-2 focus:ring-red-100 outline-none shadow-sm transition-all text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-filipino-red text-white border-filipino-red shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-filipino-red hover:text-filipino-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-end border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-serif font-bold text-gray-800">
                {selectedCategory === 'All' ? 'All Recipes' : selectedCategory}
            </h2>
            <span className="text-sm text-gray-500 mb-1">{filteredDishes.length} dishes found</span>
        </div>

        {/* Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDishes.map(dish => (
              <RecipeCard 
                key={dish.id} 
                dish={dish} 
                onClick={setSelectedDish} 
              />
            ))}
          </div>
        ) : (
            <div className="text-center py-20 opacity-60">
                <div className="text-6xl mb-4">🍲</div>
                <p className="text-xl">No dishes found.</p>
                <p>Try adjusting your search term.</p>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-auto">
        <p>© {new Date().getFullYear()} Rolando Kusina. 100 Authentic Filipino Flavors.</p>
        <p className="text-xs mt-2">Recipes curated for inspiration. Taste may vary!</p>
      </footer>

      {/* Modal */}
      {selectedDish && (
        <RecipeDetailModal 
            dish={selectedDish} 
            onClose={() => setSelectedDish(null)} 
        />
      )}
    </div>
  );
};

export default App;