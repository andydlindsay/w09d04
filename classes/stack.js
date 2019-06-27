module.exports = class Stack {
    constructor() {
        this.stack = [];
    }

    push(data) {
        this.stack.push(data);
        return this;
    }

    pop() {
        return this.stack.pop();
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    get length() {
        return this.stack.length;
    }
}
