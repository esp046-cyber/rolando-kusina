import { GoogleGenAI, Type } from "@google/genai";
import { RecipeDetail } from "../types";

// NOTE: Accessing API KEY from environment variable as per instructions
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRecipeDetail = async (dishName: string): Promise<RecipeDetail | null> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Create a detailed, authentic Filipino recipe for "${dishName}".
    Includes:
    1. A brief appetizing description.
    2. Prep time and cook time.
    3. Number of servings.
    4. List of ingredients with amounts.
    5. Step-by-step cooking instructions.
    6. A "Chef's Tip" or a fun historical fact about the dish.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            cookTime: { type: Type.STRING },
            servings: { type: Type.NUMBER },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  amount: { type: Type.STRING }
                }
              }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            chefTips: { type: Type.STRING }
          },
          required: ["name", "ingredients", "instructions"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RecipeDetail;
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};
