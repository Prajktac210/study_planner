import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

// Change this to the model available for your account
const MODEL_NAME = "gemini-3.5-flash";

if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env");
    process.exit(1);
}

console.log("✅ .env loaded");
console.log("✅ API Key Loaded");

const ai = new GoogleGenAI({
    apiKey: API_KEY
});

// Health Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart AI Study Planner Backend Running 🚀"
    });
});

// Chat Route
app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                reply: "Message is required."
            });
        }

        const result = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        });

        const reply =
            result?.candidates?.[0]?.content?.parts?.[0]?.text ||
            result?.text ||
            "No response generated.";

        res.json({
            success: true,
            reply
        });

    } catch (error) {

        console.error("========== GEMINI ERROR ==========");
        console.error(error);
        console.error("=================================");

        res.status(500).json({
            success: false,
            reply: error.message || "Unable to connect to Gemini API."
        });

    }

});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});