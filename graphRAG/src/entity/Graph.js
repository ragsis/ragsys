import { GraphNode } from "./GraphNode.js";

export class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(id, content) {
        if (!this.nodes.has(id)) {
            const newNode = new GraphNode(id, content);
            this.nodes.set(id, newNode);
        }
    }

    addEdge(id1, id2, weight = 1) {
        const node1 = this.nodes.get(id1);
        const node2 = this.nodes.get(id2);

        if (node1 && node2) {
            node1.addNeighbor(node2, weight);
            node2.addNeighbor(node1, weight);
        }
    }

    getNode(id) {
        return this.nodes.get(id);
    }
}

