import { dirDegreesOutput, undirDegreesOutput, outSemiDegree, inSemiDegree } from "./degrees.js";

console.log("Степені вершин напрямленого графа:", dirDegreesOutput);
console.log("Степені вершин ненапрямленого графа:", undirDegreesOutput);

console.log("Напівстепені виходу напрямленого графа:", outSemiDegree);
console.log("Напівстепені входу напрямленого графа:", inSemiDegree);

import {dirRegular} from './isRegular.js';

if (dirRegular.regular) {
    console.log(`Граф є регулярним зі степенню однорідності ${dirRegular.degree}`);
} else {
    console.log("Граф не є регулярним");
}

import { dirVertices } from "./hanging&Isolated.js";

console.log("Висячі вершини напрямленого графа:", dirVertices.hangingVertices);
console.log("Ізольовані вершини напрямленого графа:", dirVertices.isolatedVertices);


console.log('НОВИЙ ОРГРАФ');

console.log("Напівстепені виходу напрямленого орграфа:", outSemiDegree);
console.log("Напівстепені входу напрямленого орграфа:", inSemiDegree);

import { dirPaths2, dirPaths3 } from "./ways.js";

console.log("Шляхи довжини 2 у напрямленому графі:", dirPaths2);
console.log("Шляхи довжини 3 у напрямленому графі:", dirPaths3);

import { reachabilityMatrix } from "./reachabilityMatrix.js";

console.log("Матриця досяжності:");
console.log(reachabilityMatrix);

import { strongConnectivityMatrix } from "./strongConnectivityMatrix.js";

console.log("Матриця сильної зв'язності:");
console.log(strongConnectivityMatrix);

import { strongItemsArr } from "./strongConnectivity.js";

console.log("Компоненти сильної зв'язності:")
console.log(strongItemsArr);

import { drawCondGraph, connectedVertices, drawCondVertices } from "./condGraph.js";

drawCondGraph(connectedVertices);
drawCondVertices();