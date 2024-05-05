"use strict";

const variant = '3328';

export const canvas = document.getElementById("graphCanvas");
export const ctx = canvas.getContext("2d");
const startX = 100;
export const startX2 = 1000;
export const startY = 100;
export const radius = 20;
export const countOfVertices = 10 + (+variant.charAt(2));
export const distanceBetweenVertices = 150;
export const edgeColors = [
    'Green',
    'Blue',
    'BlueViolet',
    'Brown',
    'Coral',
    'DarkRed',
    'DarkGreen',
    'DarlMagenta',
    'DeepPink',
    'GoldenRod',
    'CadetBlue',
    'Crimson',
]

export const drawCircle = (x, y, number, color = 'black') => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, x, y);
}

export const drawDirGraphVertex = (x = startX, y = startY) => {
    let curX = x;
    let curY = y;
    let vertexNumber = 1;
    let vertices = [];
    const verticesToSide = Math.floor(countOfVertices / 2) - 1;

    let i = 0;
    while (i < countOfVertices) {
        drawCircle(curX, curY, vertexNumber);
        vertices.push({ x: curX, y: curY, number: vertexNumber });

        switch (true) {
            case i < verticesToSide - 1:
                curX += distanceBetweenVertices;
                break;
            case i < verticesToSide + 1:
                curY += distanceBetweenVertices;
                break;
            case i === verticesToSide * 2 - 3:
                curX -= distanceBetweenVertices * 2;
                break;
            case i < (verticesToSide * 2) - 1:
                curX -= distanceBetweenVertices;
                break;
            case i < (verticesToSide * 2):
                curY -= distanceBetweenVertices;
                break;
            default:
                curX += distanceBetweenVertices * 2;
        }
        vertexNumber++;
        i++;
    }
    return vertices;
};

const pseudoRandom = (seed) => {
    let value = seed;
    return function () {
        value = (value * 1103515245 + 12345) % 2147483648;
        return value % 100 < 12;
    }
}

const directMatrix = (myVariant) => {
    const myVariantArray = [...(myVariant)].map(Number);
    const count = 10 + myVariantArray[2];
    const k = 1.0 - myVariantArray[2] * 0.01 - myVariantArray[3] * 0.005 - 0.15;
    const generator = pseudoRandom(myVariant);
    let matrix = new Array(count);
    for (let i = 0; i < count; i++) {
        matrix[i] = new Array(count);
    }
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            matrix[i][j] = Math.floor(generator() * 2 * k);
        }
    }
    return matrix;
};


export const matrix = directMatrix(variant);
const dirVertexCoord = drawDirGraphVertex();
let dirVertexMatrix = {};
dirVertexCoord.forEach((vertex, index) => {
    dirVertexMatrix[index] = vertex;
});


export const drawLine = (start, end, drawArrow = false, color = 'black') => {
    const arrowSize = 10;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let startX = start.x + radius * Math.cos(angle);
    let startY = start.y + radius * Math.sin(angle);
    let arrowEndX = end.x - 20 * Math.cos(angle);
    let arrowEndY = end.y - 20 * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(arrowEndX, arrowEndY);
    ctx.strokeStyle = color;
    ctx.stroke();

    if (drawArrow) {
        const arrowDistance = 20;
        const bendAngle = Math.PI / 10;

        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;

        const newEndX = end.x - (dx / length) * arrowDistance;
        const newEndY = end.y - (dy / length) * arrowDistance;

        let controlX, controlY;
        if (start.x !== end.x && start.y !== end.y) {
            const angle = Math.atan2(dy, dx);
            controlX = midX + Math.cos(angle + bendAngle) * length / 3.5;
            controlY = midY + Math.sin(angle + bendAngle) * length / 5;
        } else if (start.x === end.x) {
            controlX = midX + 100;
            controlY = midY;
        } else {
            controlX = midX;
            controlY = midY + 100;
        }

        const angle = Math.atan2(dy, dx);
        ctx.save();
        ctx.translate(newEndX, newEndY);
        ctx.rotate(angle);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, arrowSize / 2);
        ctx.lineTo(-arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}


export const drawArc = (start, end, drawArrow = false, color = 'black') => {
    const arrowDistance = 20;
    const bendAngle = Math.PI / 10;
    const arrowSize = 10;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    let angle = 2;
    let startX = start.x + radius * Math.cos(angle);
    let startY = start.y + radius * Math.sin(angle);
    

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const newEndX = end.x - (dx / distance) * arrowDistance;
    const newEndY = end.y - (dy / distance) * arrowDistance;

    let controlX, controlY;
    if (start.x !== end.x && start.y !== end.y) {
        const angle = Math.atan2(dy, dx);
        controlX = midX + Math.cos(angle + bendAngle) * distance / 3.5;
        controlY = midY + Math.sin(angle + bendAngle) * distance / 5;
    } else if (start.x === end.x) {
        controlX = midX + 100;
        controlY = midY;
    } else {
        controlX = midX;
        controlY = midY + 100;
    }

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, newEndX, newEndY);
    ctx.strokeStyle = color;
    ctx.stroke();

    if (drawArrow) {
        const angle = Math.atan2(newEndY - controlY, newEndX - controlX);
        ctx.save();
        ctx.translate(newEndX, newEndY);
        ctx.rotate(angle);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, arrowSize / 2);
        ctx.lineTo(-arrowSize, -arrowSize / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    return { newEndX, newEndY, controlX, controlY };
}


const drawLoop = (startEl, drawArrow = false) => {
    const arrowDistance  = 20;
    const arrowSize = 8;
    const controlDistance = 70 * Math.sqrt(2);
    const controlOffset = 70;
    const controlX1 = startEl.x - controlOffset;
    const controlY1 = startEl.y - controlOffset;
    const controlX2 = startEl.x + controlOffset;
    const controlY2 = startEl.y - controlOffset;

    const ratio = arrowDistance / controlDistance;
    const arrowX = startEl.x + (controlX2 - startEl.x) * ratio;
    const arrowY = startEl.y + (controlY2 - startEl.y) * ratio;

    ctx.beginPath();
    ctx.moveTo(startEl.x, startEl.y);
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, startEl.x, startEl.y);
    ctx.stroke();

    if (drawArrow) {
        const dx = startEl.x - arrowX;
        const dy = startEl.y - arrowY;
        const angle = Math.atan2(dy, dx);
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(Math.atan2(controlY2 - startEl.y, controlX2 - startEl.x) + angle);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-arrowSize, arrowSize / 2);
        ctx.lineTo(-arrowSize, -arrowSize / 1);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    return { arrowX, arrowY, controlY2, controlX2 };
}



export const areVerticesAdjacent = (v1, v2, coords) => {
    const [minX, maxX] = [Math.min(v1.x, v2.x), Math.max(v1.x, v2.x)];
    const [minY, maxY] = [Math.min(v1.y, v2.y), Math.max(v1.y, v2.y)];

    return coords.some(vertex => {
        if (vertex.x === v1.x && vertex.y === v1.y) return false;
        if (vertex.x === v2.x && vertex.y === v2.y) return false;

        return (
            (vertex.y - v1.y) * (v2.x - v1.x) === (v2.y - v1.y) * (vertex.x - v1.x) &&
            minX <= vertex.x && vertex.x <= maxX &&
            minY <= vertex.y && vertex.y <= maxY
        );
    });
}


const drawDirGraph = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if ((matrix[i][j] === 1 || matrix[j][i] === 1) && !(matrix[i][j] === 1 && matrix[j][i] === 1)) {
                if (areVerticesAdjacent(dirVertexMatrix[i], dirVertexMatrix[j], dirVertexCoord)) {
                    drawArc(dirVertexMatrix[i], dirVertexMatrix[j], true);
                } else if (matrix[i][j] === 1 && i < j) {
                    drawLine(dirVertexMatrix[i], dirVertexMatrix[j], true);
                } else {
                    drawLine(dirVertexMatrix[j], dirVertexMatrix[i], true);
                }
            } else if (matrix[i][j] === 1 && matrix[j][i] === 1) {
                if (areVerticesAdjacent(dirVertexMatrix[i], dirVertexMatrix[j], dirVertexCoord)) {
                    drawArc(dirVertexMatrix[j], dirVertexMatrix[i], true);
                } else if (matrix[i][j] === 1 && i === j) {
                    drawLoop(dirVertexMatrix[i], true);
                } else {
                    drawArc(dirVertexMatrix[j], dirVertexMatrix[i], true);
                    drawLine(dirVertexMatrix[i], dirVertexMatrix[j], true);
                }
            }
        }
    }
}

drawDirGraph(matrix);
drawDirGraphVertex();