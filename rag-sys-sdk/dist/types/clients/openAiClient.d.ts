import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
declare function loadOpenai(): OpenAI;
declare function getOpenAIChat(messages: ChatCompletionMessageParam[]): Promise<any>;
export { loadOpenai, getOpenAIChat };
