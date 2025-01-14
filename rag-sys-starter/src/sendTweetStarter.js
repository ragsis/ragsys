import { config } from 'dotenv';
config()
import ragSys from 'rag-sys';
const { getOpenAIChat, postTweetThread, postTweet, fetchUserTweetsByName } = ragSys;

const newTweetRules = [
    "Filter out ads and event-based tweets",
    "Filter out tweets that are irrelevant to the cryptocurrency community",
    "Refine the topics of the most repeated tweets content",
    "Use of X-compliant acronyms",
    "Concise content",
    "Keep only one or two topics",
    "Do not use periods and #",
    "End each sentence with a blank line"
]

function getPrompt() {
    return "Based on the content of the tweets below follow these rules(" + newTweetRules.join(',') + ")Generate a new English tweet :";
}

async function getTweetDataSource() {
    const tweets = await fetchUserTweetsByName("OpenAI", 10)
    const totalText = tweets.data.reduce((text, curr, index) => {
        const content = "\n" + Number(index + 1) + ":: " + "\n" + curr.text + "\n"
        text = text + content
        return text
    }, '')
    return totalText
}

async function sendTweet(data) {
    try {
        const prompt = getPrompt();
        const messages = [
            {
                "role": "system",
                "content": "Please play Musk and use Musk's style of tweeting"
            },
            { role: "user", content: `${prompt} ${data}` }
        ]
        const outPut = await getOpenAIChat(messages);
        const outArray = outPut.split(/[\n]/).filter(Boolean);
        if (outArray.length > 1) {
            await postTweetThread(outArray);
        } else {
            await postTweet(outPut);
        }
    } catch (error) {
        console.error('Error sendTweet:', error);
    }
}

async function main() {
    const data = await getTweetDataSource()
    await sendTweet(data)
    setInterval(() => {
        sendTweet(data)
    }, 3600 * 2 * 1000)
}

main()




