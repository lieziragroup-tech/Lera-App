
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    res.status(500).json({ error: "AI service is not configured" });
    return;
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) {
    res.status(400).json({ error: "Missing 'message' in request body" });
    return;
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Kamu adalah Terra, AI Eco Assistant khusus untuk LERA (produk cleaning sheet eco-dissolvable). Jawab dengan ramah, ringkas, dan gaya penulisan yang rapi dalam Bahasa Indonesia. Pertanyaan pengguna: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const detail = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, detail);
      res.status(502).json({ error: "Gemini API returned an error" });
      return;
    }

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      // Can happen when Gemini blocks the response (safety filters) or
      // returns an unexpected shape. Let the client fall back gracefully
      // instead of crashing.
      console.error("Gemini response had no candidates:", JSON.stringify(data));
      res.status(502).json({ error: "No response from AI" });
      return;
    }

    res.status(200).json({ text });
  } catch (err: any) {
    console.error("Failed to reach Gemini API:", err?.message || err);
    res.status(500).json({ error: "Failed to reach AI service" });
  }
}