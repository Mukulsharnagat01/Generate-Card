import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateDesignsWithGemini(count: number = 20, businessData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `As a professional business card designer, generate ${count} unique, creative business card design configurations. Each design should be distinct with different visual characteristics.

Business card details:
Name: ${businessData.name}
Title: ${businessData.title}
Company: ${businessData.company}
Industry/Style Hints: Professional, Modern

Return only a JSON array of ${count} designs. Each design object must have:
{
  "id": "unique-id",
  "name": "Design Name",
  "bgStyle": "background style (gradient, solid, pattern)",
  "bgColors": ["color1", "color2"],
  "textColor": "text color (use valid hex codes)",
  "accentColor": "accent color (use valid hex codes)",
  "layout": "layout type (split, centered, left-aligned)",
  "decoration": "decoration type (circles, lines, shapes, none)",
  "fontWeight": "font weight (normal, bold, light)",
  "fontFamily": "font family (Arial, Helvetica, Times New Roman, Georgia, Verdana, etc)",
  "borderStyle": "border style (none, solid, dashed, rounded)"
}

Make designs diverse including: modern, vintage, minimal, bold, elegant, playful, professional, creative styles.
Use valid hex color codes for all colors and common web font families.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Failed to parse design data from AI response");
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error generating designs with Gemini:", error);
    throw error;
  }
}