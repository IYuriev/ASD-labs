import { weightMatrix } from "./kruskal.js";
import {
  drawLoop,
  drawArc,
  drawLine,
  areVerticesAdjacent,
  dirVertexMatrix,
  dirVertexCoord,
  undirVertexCoord,
  undirVertexMatrix,
  colors,
  drawUndirGraphVertex,
} from "./main.js";

let color = 0;
export const drawKruskalGraph = (vertices, colors) => {
  const vertex1 = vertices[0];
  const vertex2 = vertices[1];
  const weight = vertices[2];

  if (vertex1 === vertex2) {
    drawLoop(dirVertexMatrix[vertex1], false, colors[color], weight);
    color++;
  } else if (
    areVerticesAdjacent(
      dirVertexMatrix[vertex1],
      dirVertexMatrix[vertex2],
      dirVertexCoord
    )
  ) {
    drawArc(
      dirVertexMatrix[vertex1],
      dirVertexMatrix[vertex2],
      false,
      colors[color],
      weight
    );
    color++;
  } else {
    drawLine(
      dirVertexMatrix[vertex1],
      dirVertexMatrix[vertex2],
      false,
      colors[color],
      weight
    );
    color++;
  }
};

let newColor = 0;
export const drawWeightGraph = (weightMatrix, colors) => {
  let WMatrix = weightMatrix;

  for (let i = 0; i < WMatrix.length; i++) {
    for (let j = i; j < WMatrix.length; j++) {
      if (WMatrix[i][j] > 0 && i === j) {
        drawLoop(
          undirVertexMatrix[i],
          false,
          colors[color],
          weightMatrix[i][j]
        );
        newColor++;
      } else if (WMatrix[i][j] > 0 && WMatrix[j][i] > 0) {
        if (
          areVerticesAdjacent(
            undirVertexMatrix[i],
            undirVertexMatrix[j],
            undirVertexCoord
          )
        ) {
          drawArc(
            undirVertexMatrix[i],
            undirVertexMatrix[j],
            false,
            colors[newColor],
            WMatrix[j][i]
          );
          newColor++;
        } else {
          drawLine(
            undirVertexMatrix[i],
            undirVertexMatrix[j],
            false,
            colors[newColor],
            WMatrix[j][i]
          );
          newColor++;
        }
      }
    }
  }
};

drawWeightGraph(weightMatrix, colors);
drawUndirGraphVertex();
