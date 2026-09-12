// api/recipe.js — Vercel serverless function
export default async function handler(req, res) {
  // Allow CORS just in case
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Parse body — Vercel sometimes needs this done manually
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { mealName, mealDesc, mealPrep, mealCal } = body || {};

  if (!mealName) {
    return res.status(400).json({ error: "mealName is required", received: body });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const prompt = `You are a friendly cooking assistant helping someone who may be a beginner cook.

Write a complete recipe for: "${mealName}"
Description: ${mealDesc}
Prep time: ${mealPrep}
Approximate calories: ${mealCal}

Return ONLY valid JSON in this exact format, no markdown, no explanation:
{
  "servings": "2 servings",
  "totalTime": "35 min",
  "difficulty": "Easy",
  "tip": "One short beginner tip for the trickiest part",
  "ingredients": [
    { "amount": "2", "unit": "lbs", "item": "chicken thighs" }
  ],
  "steps": [
    { "num": 1, "title": "Preheat oven", "detail": "Preheat your oven to 400°F (200°C). Line a baking sheet with foil for easy cleanup." }
  ]
}

Rules:
- 4 to 7 ingredients
- 4 to 6 steps, each with a short title and 1-2 sentence detail written for a beginner
- difficulty: Easy, Medium, or Easy-Medium
- Keep amounts realistic for 2 servings
- The tip should address the most common mistake beginners make`;

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return res.status(502).json({ error: "Anthropic API error", status: apiRes.status, detail: errText });
    }

    const data = await apiRes.json();
    const text = data.content?.map(c => c.text || "").join("").trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);

  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: e.message });
  }
}
