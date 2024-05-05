import { matrix } from "./main.js";

class DFS {
    constructor() {
        this.paths = [];
        this.stack = [];
    }

    stackAdd(element) {
        this.stack.push(element);
        this.paths.push([element, 'active']);
    }

    stackDel() {
        if (this.stack.length > 0) {
            const element = this.stack.pop();
            this.paths.push([element, 'closed']);
            if (this.stack.length > 0) {
                this.paths.push([this.stack[this.stack.length - 1], 'active']);
            }
        }
    }

    peekStack() {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }

    isEmpty() {
        if (this.stack.length > 0) {
            this.paths.push([this.stack[this.stack.length - 1], 'visited']);
        }
        return this.stack.length === 0;
    }

    getPaths() {
        return this.paths;
    }
}

const findDFS = (matrix) => {
    const dfsMatrix = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));
    const S = new DFS();
    const dfs = Array(matrix.length).fill(0);
    let k = 1;

    const findWays = (element) => {
        dfs[element] = 1;
        S.stackAdd(element);

        while (!S.isEmpty()) {
            let used = false;
            const v = S.peekStack();
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[v][i] === 1 && dfs[i] === 0) {
                    k++;
                    dfsMatrix[v][i] = 1;
                    dfs[i] = k;
                    S.stackAdd(i);
                    used = true;
                    break;
                }
            }
            if (!used) {
                S.stackDel();
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        if (dfs[i] === 0) {
            findWays(i);
        }
    }

    const dfsWays = S.getPaths();

    console.log('Матриця DFS');
    console.log(dfsMatrix);

    console.log('Вектор DFS');
    dfs.forEach((item, index) => {
        console.log(`Новий номер вершини ${index + 1} -> ${item}`);
    })

    return dfsWays;
}

const calculatedDFS = findDFS(matrix);
console.log('statuses DFS');
console.log(calculatedDFS);

export { calculatedDFS }