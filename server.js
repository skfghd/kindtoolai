import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// CORS 허용 (다른 사이트에서도 호출 가능)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// 프론트에서 이 주소로 요청 보내면 Gemini API 호출
app.post("/api/ask", async (req, res) => {
  try {
    const prompt = req.body?.prompt || "hello";
    const key = process.env.GEMINI_KEY; // Replit Secrets에 저장한 값
    if (!key) return res.status(500).json({ error: "GEMINI_KEY missing" });

    const apiURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + key;
    const r = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }]}] })
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.get("/", (_req, res) => res.send("OK")); // 확인용

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
