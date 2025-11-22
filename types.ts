export enum Category {
  MAINS = 'Mains (Ulam)',
  SOUPS = 'Soups (Sabaw)',
  NOODLES = 'Noodles (Pancit)',
  VEGETABLE = 'Vegetable (Gulay)',
  RICE = 'Rice (Kanin)',
  STREET_FOOD = 'Street Food',
  BREAKFAST = 'Breakfast (Almusal)',
  DESSERT = 'Dessert (Panghimagas)',
  CONDIMENTS = 'Condiments (Sawsawan)'
}

export interface DishSummary {
  id: string;
  name: string;
  category: Category;
  description: string; // Short one-liner
}

export interface Ingredient {
  item: string;
  amount: string;
}

export interface RecipeDetail {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  chefTips: string; // A secret tip or history fact
}
