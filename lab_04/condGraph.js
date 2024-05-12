import { drawCircle, dirVertexCoord, drawArc } from "./main.js";
import { strongItemsArr } from "./strongConnectivity.js";
import { output } from "./connections.js";

const doSortedCondVertex = (array) =>{
    let correctVertexes = []

    for (const correctVertex of array) {
        correctVertexes.push(correctVertex[0])
    }

    return correctVertexes;
}

let sortedCondVertex = doSortedCondVertex(strongItemsArr);



let newCondCoords = (sortedCondVertex, dirVertexCoord) =>{
    const indexCoordinateMapping = {};

    sortedCondVertex.forEach(index => {
        indexCoordinateMapping[index] = dirVertexCoord[index];
    });

    return indexCoordinateMapping;
}

const condVertexCoords = newCondCoords(sortedCondVertex, dirVertexCoord);


const drawCondVertices = () => {
    let number = 1;
    for (const index in condVertexCoords) {
        const { x, y } = condVertexCoords[index];
        drawCircle(x + 600, y + 450, number);
        number++;
    }
}

drawCondVertices();


let number = 1;
const coordsOnCanvas = [];
for (const index in condVertexCoords) {
    const { x, y } = condVertexCoords[index];
    coordsOnCanvas.push(drawCircle(x + 600, y + 450, number));        
    number++;
}


function connectVertices(vertices, edges) {
    const connectedVertices = [];

    edges.forEach(edge => {
        const startVertex = vertices[edge[0]];
        const endVertex = vertices[edge[1]];

        connectedVertices.push({
            start: { x: startVertex.x, y: startVertex.y },
            end: { x: endVertex.x, y: endVertex.y }
        });
    });

    return connectedVertices;
}


const connectedVertices = connectVertices(coordsOnCanvas, output);

const drawCondGraph = (connectedVertices) => {
    for (const connectedVertex of connectedVertices) {
        drawArc(connectedVertex.start, connectedVertex.end, true);
    }
    
}


export { drawCondGraph, connectedVertices, drawCondVertices };