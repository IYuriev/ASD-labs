import { undirMatrix, directMatrix } from "./main.js";

const WMatrix = (matrix) => {
  const matrixLength = matrix.length;
  const BMatrix = directMatrix("3328", true);

  const CMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    CMatrix[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      CMatrix[i][j] = Math.ceil(BMatrix[i][j] * 100 * matrix[i][j]);
    }
  }

  const DMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    DMatrix[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      DMatrix[i][j] = CMatrix[i][j] === 0 ? 0 : 1;
    }
  }

  const HMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    HMatrix[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      HMatrix[i][j] = DMatrix[i][j] !== DMatrix[j][i] ? 1 : 0;
    }
  }

  const TrMatrix = [];
  for (let i = 0; i < matrixLength; i++) {
    TrMatrix[i] = [];
    for (let j = 0; j < matrixLength; j++) {
      TrMatrix[i][j] = i < j ? 1 : 0;
    }
  }

  const WMatrix = Array.from({ length: matrixLength }, () =>
    Array(matrixLength).fill(0)
  );
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      WMatrix[i][j] = WMatrix[j][i] =
        (DMatrix[i][j] + HMatrix[i][j] * TrMatrix[i][j]) * CMatrix[i][j];
    }
  }

  return WMatrix;
};

export const weightMatrix = WMatrix(undirMatrix);
console.log(weightMatrix);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  connections() {
    const connect = [];
    let { head } = this;
    while (head?.value) {
      connect.push(head.value);
      head = head.next;
    }
    return connect;
  }
}

const createGraph = (matrix, selectedConnects) => {
  const matrixLength = matrix.length;
  const graph = Array.from({ length: matrixLength }, () => []);

  selectedConnects.forEach(({ from, to }) => {
    graph[from].push(to);
    graph[to].push(from);
  });

  return graph;
};

const CheckCycle = (matrix, selectedConnects) => {
  const graph = createGraph(matrix, selectedConnects);
  const visited = new Array(graph.length).fill(false);

  const detectCycle = (vertex, parent) => {
    visited[vertex] = true;

    for (const item of graph[vertex]) {
      if (!visited[item]) {
        if (detectCycle(item, vertex)) {
          return true;
        }
      } else if (item !== parent) {
        return true;
      }
    }
    return false;
  };

  for (let vertex = 0; vertex < graph.length; vertex++) {
    if (!visited[vertex] && detectCycle(vertex, -1)) {
      return true;
    }
  }
  return false;
};

const sort = (matrix) => {
  const connects = [];
  const matrixLength = matrix.length;

  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      if (matrix[i][j] > 0) {
        connects.push({ from: i, to: j, weight: matrix[i][j] });
      }
    }
  }
  connects.sort((a, b) => a.weight - b.weight);
  return connects;
};

const kruskalAlgorithm = (matrix) => {
  const matrixLength = matrix.length;
  const connects = sort(matrix);
  const selectedConnects = new List();

  let count = 0;
  let index = 0;

  while (count < matrixLength - 1 && index < connects.length) {
    const connect = connects[index];
    index++;
    const selectedConnectsArray = selectedConnects.connections();

    if (!CheckCycle(matrix, selectedConnectsArray.concat(connect))) {
      selectedConnects.append(connect);
      count++;
    }
  }
  return selectedConnects;
};

const list = kruskalAlgorithm(weightMatrix);
console.log(list);
export const tree = list.connections();
console.log("Minimum Spanning Tree:", tree);
