import React from 'react';
import { DishSummary } from '../types';

interface RecipeCardProps {
  dish: DishSummary;
  onClick: (dish: DishSummary) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ dish, onClick }) => {
  const encodedName = encodeURIComponent(dish.name);
  // Generate a specific, realistic image for the dish
  const imageUrl = `https://image.pollinations.ai/prompt/delicious%20filipino%20food%20${encodedName}%20served%20on%20plate%20professional%20photography?width=400&height=300&nologo=true`;

  return (
    <div 
      onClick={() => onClick(dish)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-orange-100 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative h-40 overflow-hidden bg-gray-200">
         <img 
            src={imageUrl} 
            alt={dish.name} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
         />
         <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-filipino-red shadow-sm">
           #{dish.id}
         </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold text-filipino-blue mb-1 tracking-wide uppercase">{dish.category}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif group-hover:text-filipino-red transition-colors">{dish.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{dish.description}</p>
        
        <div className="mt-4 flex items-center text-filipino-yellow text-sm font-medium group-hover:underline">
          View Recipe 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </div>
    </div>
  );
};