import { matrix } from "./main.js";


class BFS {
    constructor() {
        this.queue = [];
        this.paths = [];
        this.closed = [];
    }

    enqueue(vertex) {
        this.queue.push(vertex);
        this.paths.push([this.queue.at(-1), 'visited']);
    }


    dequeue() {
        this.paths.push([this.queue.at(0), 'active']);
        this.closed.push(this.queue.at(0));
        return this.queue.shift();
    }

    isEmpty() {
        if (!this.paths.includes(this.closed) && this.closed.length !== 0) {
            this.paths.push([...this.closed, 'closed']);
            this.closed = [];
        }
        return this.queue.length === 0;
    }


    getPaths(){
        return this.paths;
    }

}



const findBFS = (matrix) => {
    const bfsMatrix = Array.from({ length: matrix.length }, () => Array(matrix.length).fill(0));
    const Q = new BFS();
    const bfs = Array(matrix.length).fill(0);
    let k = 1;

    const findWays = (element) => {
        const ways = { result: [] };
        bfs[element] = 1;
        Q.enqueue(element);

        while (!Q.isEmpty()) {
            const v = Q.dequeue();
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[v][i] === 1 && bfs[i] === 0) {
                    k++;
                    bfsMatrix[v][i] = 1;
                    bfs[i] = k;
                    Q.enqueue(i);
                    ways.result.push([v, i]);
                }
            }
            if(ways.result.length === 0) {
                ways.result.push([v, 0]);
            }
        }
        return ways;
    }

    for (let i = 0; i < matrix.length; i++) {
        if (bfs[i] === 0) {
            findWays(i);
        }
    }
    const bfsWays = Q.getPaths();

    console.log('Матриця BFS');
    console.log(bfsMatrix);

    console.log('Вектор BFS');
    bfs.forEach((item, index) => {
        console.log(`Новий номер вершини ${index + 1} -> ${item}`);
    })

    return bfsWays;
}

const calculatedBFS = findBFS(matrix);
console.log('statuses BFS');
console.log(calculatedBFS);

export { calculatedBFS }