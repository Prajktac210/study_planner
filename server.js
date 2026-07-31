import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini Client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart AI Study Planner Backend is Running 🚀"
    });
});

// Chat API
app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        res.json({
            success: true,
            reply: result.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            reply: "Unable to connect to Gemini API."
        });

    }

});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});