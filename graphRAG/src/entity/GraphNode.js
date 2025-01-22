export class GraphNode {
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.embedding = null;
        this.neighbors = new Map();
    }

    addNeighbor(node, weight = 1) {
        this.neighbors.set(node, weight);
    }
}