// This file runs on the Supabase Edge (Deno) runtime. TypeScript in your editor (Node)
// may show errors for Deno globals and remote imports. To avoid noisy editor errors
// while keeping the file runnable on Supabase, disable TS checking for this file.
// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Credentials": "true",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { count = 100, businessData } = await req.json();
    // Prefer Hugging Face if configured, then direct Gemini (Google Generative AI), otherwise fall back to Lovable gateway.
    const HUGGINGFACE_API_KEY = Deno.env.get("HUGGINGFACE_API_KEY");
    const HUGGINGFACE_MODEL = "google/flan-t5-large";  // Using a reliable free model
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    console.log("Generating", count, "design variations");

    let response: Response;
    if (HUGGINGFACE_API_KEY) {
      // Use Hugging Face Inference API to generate business card designs
      const hfEndpoint = `https://api-inference.huggingface.co/models/${HUGGINGFACE_MODEL}`;
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
        "borderStyle": "border style"
      }
      Make the designs diverse including modern, vintage, minimal, bold, elegant, playful, and professional styles. Use valid hex color codes.`;
      
      const hfBody = {
        inputs: prompt,
        parameters: {
          max_new_tokens: 2048,
          temperature: 0.8,
          top_p: 0.9,
          return_full_text: false,
        },
        options: { 
          wait_for_model: true,
          use_cache: false
        },
      };

      response = await fetch(hfEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hfBody),
      });
    } else if (GEMINI_API_KEY) {
      // Use Google Generative Language REST API (chat-style). Replace model name if needed.
      // NOTE: You must enable the Generative AI API in your Google Cloud project and set GEMINI_API_KEY as a project secret.
      const endpoint = "https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.5:generateMessage";
      const prompt = `You are a professional business card designer. Generate ${count} unique, creative business card design configurations as a pure JSON array. Each design object must include these fields: id, name, bgStyle, bgColors (array of hex colors), textColor, accentColor, layout, decoration, fontWeight, borderStyle. Make designs diverse: modern, vintage, minimal, bold, elegant, playful, professional. Use valid hex color codes and concise names.`;

      const body = {
        messages: [
          { author: "system", content: { type: "text", text: "You are a helpful assistant that outputs JSON only." } },
          { author: "user", content: { type: "text", text: prompt } },
        ],
        temperature: 0.7,
        maxOutputTokens: 1024,
      };

      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  } else if (LOVABLE_API_KEY) {
      // Fall back to Lovable gateway which already routes to Gemini in the original project
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are a professional business card designer. Generate ${count} unique, creative business card design configurations. Each design should have distinct visual characteristics including colors, layouts, typography styles, and decorative elements. Return a JSON array of ${count} designs. Each design object must have: { "id": "unique-id", "name": "Design Name", "bgStyle": "background style (gradient, solid, pattern, etc)", "bgColors": ["color1", "color2"], "textColor": "text color", "accentColor": "accent color", "layout": "layout type (split, centered, left-aligned, etc)", "decoration": "decoration type (circles, lines, shapes, none)", "fontWeight": "font weight (normal, bold, light)", "borderStyle": "border style (none, solid, dashed, rounded) }`,
            },
            {
              role: "user",
              content: `Generate ${count} unique business card designs.`,
            },
          ],
        }),
      });
    } else {
      throw new Error("No AI API key configured. Set GEMINI_API_KEY or LOVABLE_API_KEY in function environment.");
    }

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

  // Parse response body into a string we can extract JSON from.
  const data: any = await response.json();

    // Various AI providers return different shapes. Try common paths, otherwise stringify and search.
    let contentText = "";

    // Hugging Face: may return { generated_text: '...' } or an array of objects
    if (!contentText && data?.generated_text) {
      contentText = data.generated_text;
    }
    if (!contentText && Array.isArray(data) && data[0]?.generated_text) {
      contentText = data[0].generated_text;
    }

    // Lovable / OpenAI-like shape: { choices: [ { message: { content: "..." } } ] }
    if (data?.choices && data.choices.length && data.choices[0]?.message?.content) {
      contentText = data.choices[0].message.content;
    }

    // Google Generative: may include `candidates` with content pieces or `output`.
    if (!contentText && data?.candidates && data.candidates.length) {
      // candidates[].content may be an array of message parts
      const first = data.candidates[0];
      if (typeof first === "string") contentText = first;
      else if (first?.content) {
        // content may be array
        if (Array.isArray(first.content)) {
          // join any text parts
          contentText = first.content.map((c: any) => c?.text || (c?.text?.toString && c.text.toString()) || "").join("\n");
        } else if (typeof first.content === "string") {
          contentText = first.content;
        } else if (first.content[0]?.text) {
          contentText = first.content[0].text;
        }
      }
    }

    // Some Google responses nest in `output` or `response.output` — fallback to stringifying
    if (!contentText && (data?.output || data?.response)) {
      contentText = JSON.stringify(data.output || data.response);
    }

    // As a last resort, stringify the whole response
    if (!contentText) contentText = JSON.stringify(data);

    // Extract JSON array from the returned text
    const jsonMatch = contentText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Failed to parse AI response for designs. Raw content:", contentText);
      throw new Error("Failed to parse design data from AI response");
    }

    const designs = JSON.parse(jsonMatch[0]);
    console.log(`Successfully generated ${designs.length} designs`);

    return new Response(JSON.stringify({ designs }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
