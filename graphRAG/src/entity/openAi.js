import { OpenAI } from "openai";
import { config } from 'dotenv';
import axios from 'axios';

config();

export const loadOpenAi = () => {
    return new OpenAI({
        baseURL: process.env.BASE_URL,
        apiKey: process.env.OPENAI_API_KEY
    });
}

export async function postGenerateEmbedding(content) {
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/embeddings",
            {
                model: "text-embedding-ada-002",
                input: content,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        return response.data.data[0].embedding;
    } catch (error) {
        console.error("Error generating embedding:", error.response?.data || error.message);
        throw error;
    }
}






