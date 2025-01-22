import { Graph } from "./entity/Graph.js";
import { loadOpenAi, postGenerateEmbedding } from "./entity/openAi.js";
import { cosineSimilarity } from "./utils/index.js";



async function generateEmbedding(content) {
    return (await postGenerateEmbedding(content));
}

async function initializeEmbeddings(graph) {
    for (let node of graph.nodes.values()) {
        if (!node.embedding) {
            node.embedding = await generateEmbedding(node.content);
        }
    }
}


async function retrieveRelevantNodes(graph, query, topK = 3) {
    const queryEmbedding = await generateEmbedding(query);
    const similarities = [];

    for (let node of graph.nodes.values()) {
        const similarity = cosineSimilarity(queryEmbedding, node.embedding);
        similarities.push({ node, similarity });
    }

    similarities.sort((a, b) => b.similarity - a.similarity);

    return similarities.slice(0, topK).map(({ node }) => node);
}


async function generateResponse(query, relevantNodes) {
    const context = relevantNodes.map((node) => node.content).join("\n");
    const openai = loadOpenAi()
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a knowledgeable assistant." },
            { role: "user", content: `Query: ${query}\nContext: ${context}` },
        ],
    });
    return response.choices[0].message.content;
}

(async () => {
    const graph = new Graph();

    graph.addNode("1", "The capital of France is Paris.");
    graph.addNode("2", "France is known for its wine and cheese.");
    graph.addNode("3", "Paris is also called the City of Light.");
    graph.addEdge("1", "2");
    graph.addEdge("1", "3");

    await initializeEmbeddings(graph);

    const query = "What is the capital of France?";
    const relevantNodes = await retrieveRelevantNodes(graph, query);
    const response = await generateResponse(query, relevantNodes);

    console.log("Generated Response:", response);
})();


