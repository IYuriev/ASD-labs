import { matrix, undirMatrix } from "./main.js"

const calculateVertexDegrees = (matrix, undirected = false) => {
    const degrees = [];

    for (let i = 0; i < matrix.length; i++) {
        let degree = 0;
        for (let j = 0; j < matrix[i].length; j++) {
            if (undirected) {
                degree += matrix[i][j]; 
            } else {
                degree += matrix[i][j]; 
                degree += matrix[j][i]; 
            }
        }
        degrees.push(degree);
    }

    return degrees;
};

export const dirDegrees = calculateVertexDegrees(matrix);
export const undirDegrees = calculateVertexDegrees(undirMatrix, true);

const formatDegrees = (degrees) => {
    return degrees.map((degree, index) => `${index + 1} - ${degree}`);
}

const dirDegreesOutput = formatDegrees(dirDegrees);
const undirDegreesOutput = formatDegrees(undirDegrees);


const calculateSemiDegree = (matrix, outDegree = true) => {
    const semiDegrees = new Array(matrix.length).fill(0);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (outDegree) {
                semiDegrees[i] += matrix[i][j]; 
            } else {
                semiDegrees[i] += matrix[j][i]; 
            }
        }
    }

    return semiDegrees.map((degree, index) => {
        return `${index + 1} - ${degree}`;
    });
};

const outSemiDegree = calculateSemiDegree(matrix, true);
const inSemiDegree = calculateSemiDegree(matrix, false);


export {dirDegreesOutput, undirDegreesOutput, outSemiDegree, inSemiDegree}