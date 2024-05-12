// fix

import { matrix } from "./main.js";
import { strongItemsArr } from "./strongConnectivity.js";

const findConnections = (graph, arrays) => {
    const connections = {
        start: [],
        end: [],
    };

    for (let i = 0; i < arrays.length; i++) {
        const subArray = arrays[i];
        for (const vertex of subArray) {
            for (let k = 0; k < graph.length; k++) {
                const adjacentVertices = graph[k];
                if (adjacentVertices[vertex] === 1 && vertex !== k) {
                    for (let h = 0; h < arrays.length; h++) {
                        if (h !== i && arrays[h].includes(k)) {
                            connections.start.push(h);
                            connections.end.push(i);
                        }
                    }
                }
            }
        }
    }
    return connections;
};


let result1 = findConnections(matrix, strongItemsArr)


let condGraph = []
condGraph.push(result1.start, result1.end)


function removeDuplicates(arr) {
    let result = [];
    let seen = new Set();
    for (let i = 0; i < arr[0].length; i++) {
        let pair = [arr[0][i], arr[1][i]];
        let key = pair.join();
        if (!seen.has(key)) {
            result.push(pair);
            seen.add(key);
        }
    }
    return result;
}


const output = removeDuplicates(condGraph);
console.log(output);
export {output}