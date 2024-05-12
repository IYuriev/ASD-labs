import { matrix } from "./main.js";

const findAllPaths = (matrix, length) => {
    const paths = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            for (let k = 0; k < matrix.length; k++) {
                if (length === 2 && matrix[i][j] === 1 && matrix[j][k] === 1) {
                    paths.push([i + 1, j + 1, k + 1]);
                }
                else if (length === 3 && matrix[i][j] === 1 && matrix[j][k] === 1) {
                    for (let l = 0; l < matrix.length; l++) {
                        if (matrix[k][l] === 1) {
                            paths.push([i + 1, j + 1, k + 1, l + 1]);
                        }
                    }
                }
            }
        }
    }

    return paths;
};

const dirPaths2 = findAllPaths(matrix, 2);
const dirPaths3 = findAllPaths(matrix, 3);

export {dirPaths2, dirPaths3}
