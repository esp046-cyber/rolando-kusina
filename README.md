1. Architecture: Static, Instant-Load SPA
The app is a Single Page Application (SPA) built with React. Its defining characteristic is that it has moved away from live AI text generation.
Local Database: All recipe data (ingredients, instructions, tips) is hardcoded in constants.ts.
Zero Latency: When a user clicks a recipe, it opens instantly because the app reads from a local variable (RECIPE_DETAILS) rather than fetching data from a server or API.
Offline Text: The recipe text works entirely without an internet connection (though images still need the internet).
2. Dynamic Visuals (AI-Generated Images)
While the text is static, the images are generated dynamically.
Pollinations.ai: The app does not store image files. In RecipeCard.tsx and RecipeDetailModal.tsx, it constructs image URLs on the fly using the dish name as a prompt (e.g., https://image.pollinations.ai/prompt/delicious%20filipino%20food...).
Visual Consistency: It forces a "professional photography" style in the prompt to ensure the 100 dishes look uniform.
3. Styling & Branding
The app features a distinct Filipino-themed design system configured in index.html:
Color Palette: Custom Tailwind colors defined as filipino-red, filipino-blue, filipino-yellow, and warm-cream.
Typography: Uses Georgia (Serif) for headings to give a traditional "cookbook" feel, and Inter (Sans) for readability.
Responsive Grid: It automatically adjusts from 1 column (mobile) up to 4 columns (desktop).
4. Search & Discovery Logic
The App.tsx handles client-side filtering:
Search: Real-time filtering by name or description.
Categorization: Filter chips (Mains, Soups, Desserts, etc.) derived from the Category enum in types.ts.
5. Vestigial Code (Unused Parts)
services/geminiService.ts: This file exists and contains logic to call Google Gemini, but it is currently orphaned/unused by the UI. The RecipeDetailModal is importing data directly from constants.ts instead of calling this service.
Summary
It is now a curated, static digital cookbook that prioritizes speed and reliability over dynamic AI generation, while still using AI for on-the-fly image rendering.

1. Instant, Zero-Latency Access
No Waiting: Unlike the previous AI version, users don't have to wait for a "Loading..." spinner. The recipes open instantly because they are stored directly within the app code.
No Setup Required: Public users do not need an API key, a login, or a subscription. It works immediately upon opening the website.
Reliability: The app will never fail because of "server errors" or "quota limits."
2. Extensive Curated Library (The "100" Promise)
Complete Catalog: A full list of 100 authentic Filipino dishes, categorized meticulously (Mains, Soups, Vegetables, Noodles, Rice, Breakfast, Street Food, Dessert).
Detailed Recipes: Every single dish includes:
Prep & Cook times.
Exact ingredient measurements.
Step-by-step instructions.
Chef's Tips/History: Cultural context or cooking secrets for every dish.
3. Smart Discovery Tools
Real-Time Search: Users can type "chicken", "coconut", or "sour" and instantly filter the grid to find relevant dishes.
Category Filtering: One-click chips to jump from "Street Food" to "Desserts" instantly.
4. Rich Visual Experience
Dynamic Imagery: The app uses AI-generated, high-quality food photography for every dish (via Pollinations.ai) to make the menu visually appetizing.
Cultural Aesthetics: The design uses a "Filipino" color palette (Red, Blue, Yellow, Cream) and typography that feels like a classic cookbook.
5. Mobile-Responsive Design
Works Anywhere: The grid layout adapts seamlessly from desktop monitors to mobile phones, making it easy to use while standing in the kitchen.
