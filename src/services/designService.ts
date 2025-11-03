import { BusinessCardData } from "@/components/BusinessCardForm";
import { generateDesignsWithGemini } from "@/lib/gemini-designs";

const HUGGING_FACE_TOKEN = import.meta.env.VITE_HUGGING_FACE_API_KEY;

export const generateDesigns = async (count: number, businessData: BusinessCardData) => {
  // Try Gemini first since it's more reliable for structured JSON output
  try {
    console.log("Attempting to generate designs with Gemini...");
    const designs = await generateDesignsWithGemini(count, businessData);
    if (designs && designs.length > 0) {
      console.log(`Successfully generated ${designs.length} designs with Gemini`);
      return designs;
    }
  } catch (error) {
    console.warn("Gemini generation failed, falling back to mock data:", error);
  }

  // Fallback to mock designs if no API key or API fails
  if (!HUGGING_FACE_TOKEN) {
    console.warn('No API keys configured — returning mock designs for local preview.');
    const safeCount = Math.max(1, Math.min(count, 10));
    const palette = [
      ['#0ea5e9', '#0369a1'],
      ['#fecaca', '#b91c1c'],
      ['#fef3c7', '#ca8a04'],
      ['#ecfccb', '#65a30d'],
      ['#eef2ff', '#4f46e5'],
    ];

    const mock = Array.from({ length: safeCount }).map((_, i) => {
      const p = palette[i % palette.length];
      return {
        id: `mock-${i}`,
        name: `${businessData.name || 'Name'} — ${['Modern','Minimal','Elegant','Bold','Playful'][i % 5]}`,
        bgStyle: i % 2 === 0 ? 'gradient' : 'solid',
        bgColors: p,
        textColor: i % 2 === 0 ? '#0f172a' : '#ffffff',
        accentColor: p[0],
        layout: ['centered','split','minimal','left-align','right-align'][i % 5],
        decoration: ['none','lines','dots','shapes'][i % 4],
        fontWeight: i % 2 === 0 ? 'bold' : 'normal',
        fontFamily: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'][i % 5],
        borderStyle: i % 3 === 0 ? 'none' : 'thin',
      };
    });

    return mock;
  }

  // If we have Hugging Face token but Gemini failed, try Hugging Face as last resort
  console.log("Attempting to generate designs with Hugging Face...");
  const MODEL = "stabilityai/stable-diffusion-xl-base-1.0"; // Using the original model

  const prompt = `Generate ${count} unique and creative business card designs as a JSON array. Each design should be unique and include:
  {
    "id": "unique-id",
    "name": "Creative name for the design",
    "bgStyle": "background style (gradient, solid, pattern)",
    "bgColors": ["primary color hex", "secondary color hex"],
    "textColor": "text color hex",
    "accentColor": "accent color hex",
    "layout": "layout style (centered, split, minimal, etc)",
    "decoration": "decorative elements (lines, dots, shapes, etc)",
    "fontWeight": "font weight style",
    "fontFamily": "font family (Arial, Helvetica, Times New Roman, Georgia, Verdana, etc)",
    "borderStyle": "border style"
  }
  Make the designs diverse including modern, vintage, minimal, bold, elegant, playful, and professional styles. Use valid hex color codes and common web font families.`;

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 2048,
          temperature: 0.8,
          top_p: 0.9,
          return_full_text: false
        },
        options: {
          wait_for_model: true,
          use_cache: false
        }
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
      throw new Error(`API error: ${response.status}- ${errorText}`);
    }

    const data = await response.json();
    let designs;

    // Parse the response based on different possible formats
    if (Array.isArray(data) && data[0]?.generated_text) {
      const jsonMatch = data[0].generated_text.match(/\[([\s\S]*)\]/);
      designs = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } else if (data.generated_text) {
      const jsonMatch = data.generated_text.match(/\[([\s\S]*)\]/);
      designs = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } else {
      designs = [];
    }

    return designs;
  } catch (error) {
    console.error("Error generating designs with Hugging Face:", error);
    // Final fallback to mock data
    console.warn("All AI services failed, using mock data");
    const safeCount = Math.max(1, Math.min(count, 10));
    const palette = [
      ['#0ea5e9', '#0369a1'],
      ['#fecaca', '#b91c1c'],
      ['#fef3c7', '#ca8a04'],
      ['#ecfccb', '#65a30d'],
      ['#eef2ff', '#4f46e5'],
    ];

    const mock = Array.from({ length: safeCount }).map((_, i) => {
      const p = palette[i % palette.length];
      return {
        id: `mock-${i}`,
        name: `${businessData.name || 'Name'} — ${['Modern','Minimal','Elegant','Bold','Playful'][i % 5]}`,
        bgStyle: i % 2 === 0 ? 'gradient' : 'solid',
        bgColors: p,
        textColor: i % 2 === 0 ? '#0f172a' : '#ffffff',
        accentColor: p[0],
        layout: ['centered','split','minimal','left-align','right-align'][i % 5],
        decoration: ['none','lines','dots','shapes'][i % 4],
        fontWeight: i % 2 === 0 ? 'bold' : 'normal',
        fontFamily: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'][i % 5],
        borderStyle: i % 3 === 0 ? 'none' : 'thin',
      };
    });

    return mock;
  }
};
