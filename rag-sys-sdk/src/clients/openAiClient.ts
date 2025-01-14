import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

function loadOpenai() {
    return new OpenAI({
        baseURL: process.env.BASE_URL,
        apiKey: process.env.API_KEY
    });
}

async function getOpenAIChat(messages: ChatCompletionMessageParam[]) {
    const openai = loadOpenai();
    const completion = await openai.chat.completions.create({
        messages,
        model: process.env.AI_MODEL,
    });
    const outPut = completion.choices[0].message.content;
    return outPut;
}

export { loadOpenai, getOpenAIChat }
