const Node = require('./node');
const Stack = require('./stack');
const { renderMaze } = require('../helpers');

module.exports = class Maze {
    constructor(width, length) {
        this.width = width;
        this.length = length;
        this.nodes = {};
        this.generateMaze();
    }

    findNeighbours(node) {
        const neighbours = [];

        // above
        if (node.y - 1 >= 0) {
            neighbours.push([this.nodes[`${node.x},${node.y - 1}`], 'above']);
        }
        
        // right
        if (node.x + 1 < this.width) {
            neighbours.push([this.nodes[`${node.x + 1},${node.y}`], 'right']);
        }

        // below
        if (node.y + 1 < this.length) {
            neighbours.push([this.nodes[`${node.x},${node.y + 1}`], 'below']);
        }

        // left
        if (node.x - 1 >= 0) {
            neighbours.push([this.nodes[`${node.x - 1},${node.y}`], 'left']);
        }

        return neighbours;
    }

    generateMaze() {
        this.initializeNodes();
        const stack = new Stack();
        stack.push(this.randomNode());

        while (stack.length) {
            const currentNode = stack.peek();
            currentNode.active = true;
            currentNode.visited = true;

            let neighbours = this.findNeighbours(currentNode);
            neighbours = neighbours.filter((elem) => !elem[0].visited);

            if (neighbours.length) {
                const [nextNode, direction] = neighbours[Math.floor(Math.random() * neighbours.length)];
                currentNode[direction] = nextNode;

                const reverse = {
                    'above': 'below',
                    'left': 'right',
                    'right': 'left',
                    'below': 'above'
                }

                nextNode[reverse[direction]] = currentNode;
                stack.push(nextNode);
            } else {
                stack.pop();
            }
            console.log(stack.length);
            renderMaze(this);
            currentNode.active = false;
        }
    }

    initializeNodes() {
        for (let y = 0; y < this.length; y++) {
            for (let x = 0; x < this.width; x++) {
                this.nodes[`${x},${y}`] = new Node(x, y);
            }
        }
    }

    findNode(x, y) {
        return this.nodes[`${x},${y}`];
    }

    randomNode() {
        const randomX = Math.floor(Math.random() * this.width);
        const randomY = Math.floor(Math.random() * this.length);
        return this.findNode(randomX, randomY);
    }
}
