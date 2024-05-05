import { startX2, startY, drawDirGraphVertex, drawCircle, areVerticesAdjacent, drawArc, drawLine } from "./main.js";


let drawBFSVertex = (x = startX2, y = startY) => {
    const drawGraphVertex = drawDirGraphVertex(x, y);
    return drawGraphVertex;
}

const newVerteciesCoords = drawBFSVertex();

let coords = {};
newVerteciesCoords.forEach((vertex, index) => {
    coords[index] = vertex;
})



let active = [];

const drawGraphBFS = (calculatedBFS, color) => {
    const vertex = calculatedBFS[0];
    const status = calculatedBFS[1];
    console.log(status);
    console.log(vertex);

    if(status === 'active') {
        drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'red');
        active.push(vertex);
    }
    console.log(active);

    if(status === 'visited' && active.length !== 0) {
        if (areVerticesAdjacent(coords[active[0]], coords[vertex], newVerteciesCoords)) {
            drawArc(coords[active[0]], coords[vertex], true, color[active[0]]);
        } else {
            drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'violet');
            drawLine(coords[active[0]], coords[vertex], true, color[active[0]]);
        }
    }

    if(status === 'closed') {
        drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'chocolate');
        active = [];
    }
    
}


const drawGraphDFS = (calculatedBFS, color) => {
    const vertex = calculatedBFS[0];
    const status = calculatedBFS[1];

    if(status === 'active') {
        drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'red');
        active.push(vertex);
    }

    if(status === 'visited') {
        drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'violet');
    }

    if(active.length === 2) {
        if(areVerticesAdjacent(coords[active[0]], coords[active[1]], newVerteciesCoords)) {
            drawArc(coords[active[0]], coords[active[1]], true, color[active[0]]);
        } else {
            drawLine(coords[active[0]], coords[active[1]], true, color[active[0]]);
        }
        active.shift();
    }

    if(status === 'closed') {
        drawCircle(coords[vertex].x, coords[vertex].y, vertex + 1, 'chocolate');
        active = [];
    }
}

export {drawGraphBFS, drawGraphDFS}