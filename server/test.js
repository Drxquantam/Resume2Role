import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Hello",
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running");
});