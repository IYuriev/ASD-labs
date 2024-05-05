import { drawGraphBFS, drawGraphDFS } from "./drawGraph.js";
import { calculatedBFS } from "./bfs.js";
import { calculatedDFS } from "./dfs.js";
import { edgeColors } from "./main.js";

const bfsButton = document.querySelector('.bfs');
let i = 0;

bfsButton.addEventListener('click', () => {
    if (i < calculatedBFS.length) {
        drawGraphBFS(calculatedBFS.at(i), edgeColors);
        i++;
    } else {
        location.reload();
    }
})

const dfsButton = document.querySelector('.dfs');

dfsButton.addEventListener('click', () => {
    if (i < calculatedDFS.length) {
        drawGraphDFS(calculatedDFS.at(i), edgeColors);
        i++;
    } else {
        location.reload();
    }
})