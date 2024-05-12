 import { matrix } from "./main.js";

const computeReachabilityMatrix = (matrix) => {
    let reachabilityMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        reachabilityMatrix.push([...matrix[i]]);
    }

    for (let k = 0; k < matrix.length; k++) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                reachabilityMatrix[i][j] = reachabilityMatrix[i][j] || (reachabilityMatrix[i][k] && reachabilityMatrix[k][j]);
            }
        }
    }

    return reachabilityMatrix;
};

const reachabilityMatrix = computeReachabilityMatrix(matrix);

export {reachabilityMatrix}