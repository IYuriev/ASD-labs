import { drawKruskalGraph } from "./graph.js";
import { tree } from "./kruskal.js";
import { colors, drawDirGraphVertex } from "./main.js";

let vertices = [];
for (const i of tree) {
  let array = [];
  for (const key in i) {
    array.push(i[key]);
  }
  vertices.push(array);
}

let result = 0;
for (let i = 0; i < vertices.length; i++) {
  result += vertices[i][2];
}
console.log(`Сума ваг ребер: ${result}`);

let i = 0;
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  if (i < vertices.length) {
    drawKruskalGraph(vertices.at(i), colors);
    drawDirGraphVertex();
    i++;
  } else {
    location.reload();
  }
});
