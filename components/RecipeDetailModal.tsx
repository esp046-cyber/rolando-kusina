import React, { useEffect, useState } from 'react';
import { DishSummary, RecipeDetail } from '../types';
import { RECIPE_DETAILS } from '../constants';

interface RecipeDetailModalProps {
  dish: DishSummary;
  onClose: () => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ dish, onClose }) => {
  const [detail, setDetail] = useState<RecipeDetail | null>(null);
  // Loading is now virtually instant, but we keep a short effect for smooth transition if needed
  // or we can just load it directly.

  useEffect(() => {
    if (dish && RECIPE_DETAILS[dish.id]) {
        setDetail(RECIPE_DETAILS[dish.id]);
    }
  }, [dish]);

  if (!dish || !detail) return null;
  
  const encodedName = encodeURIComponent(dish.name);
  const imageUrl = `https://image.pollinations.ai/prompt/delicious%20authentic%20filipino%20food%20${encodedName}%20plated%20meal%20professional%20photography?width=800&height=400&nologo=true`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="flex-none p-4 border-b flex justify-between items-center bg-warm-cream">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-filipino-red">{dish.name}</h2>
            <p className="text-sm text-gray-600">{dish.category}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
            <div>
              {/* Real Image Banner */}
              <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-8 shadow-md relative bg-gray-100">
                <img 
                    src={imageUrl} 
                    alt={dish.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white/90 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                        ✨ Traditional Recipe
                    </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Info & Ingredients */}
                <div className="md:col-span-1 space-y-6">
                   <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                              <span className="block text-xs text-gray-500 uppercase tracking-wider">Prep</span>
                              <span className="font-bold text-filipino-blue">{detail.prepTime}</span>
                          </div>
                          <div>
                              <span className="block text-xs text-gray-500 uppercase tracking-wider">Cook</span>
                              <span className="font-bold text-filipino-blue">{detail.cookTime}</span>
                          </div>
                          <div className="col-span-2 border-t border-orange-200 pt-2 mt-2">
                               <span className="block text-xs text-gray-500 uppercase tracking-wider">Serves</span>
                               <span className="font-bold text-gray-800">{detail.servings} people</span>
                          </div>
                      </div>
                   </div>

                   <div>
                      <h3 className="text-lg font-bold text-gray-800 border-b-2 border-filipino-yellow inline-block mb-4">Ingredients</h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                          {detail.ingredients.map((ing, idx) => (
                              <li key={idx} className="flex justify-between border-b border-dashed border-gray-200 pb-1 last:border-0">
                                  <span>{ing.item}</span>
                                  <span className="font-semibold text-gray-900">{ing.amount}</span>
                              </li>
                          ))}
                      </ul>
                   </div>

                   {detail.chefTips && (
                       <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 border border-blue-100">
                           <strong className="block mb-1">💡 Chef's Tip:</strong>
                           {detail.chefTips}
                       </div>
                   )}
                </div>

                {/* Right Column: Instructions */}
                <div className="md:col-span-2 space-y-6">
                   <p className="text-gray-600 italic text-lg leading-relaxed">"{detail.description}"</p>
                   
                   <div>
                      <h3 className="text-lg font-bold text-gray-800 border-b-2 border-filipino-yellow inline-block mb-4">Instructions</h3>
                      <div className="space-y-6">
                          {detail.instructions.map((step, idx) => (
                              <div key={idx} className="flex gap-4">
                                  <div className="flex-none w-8 h-8 rounded-full bg-filipino-red text-white flex items-center justify-center font-bold text-sm">
                                      {idx + 1}
                                  </div>
                                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                              </div>
                          ))}
                      </div>
                   </div>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  );
};