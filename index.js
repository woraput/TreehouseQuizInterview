const fs = require("fs");
const filename = process.argv[2];

const maps = fs.readFileSync(filename, "utf-8").split("\r\n");
const treeGroup = maps.map((treesRow) =>
  treesRow.split("").map((tree) => parseInt(tree))
);

const isVisibleTree = [];

for (let i = 0; i < treeGroup.length; i++) {
  if (i === 0 || i === treeGroup.length - 1) {
    treeGroup[i].map((_, index) => isVisibleTree.push(treeGroup[i][index]));
  } else {
    for (let j = 0; j < treeGroup[i].length; j++) {
      const tree = treeGroup[i][j];

      if (j === 0 || j === treeGroup[i].length - 1) {
        isVisibleTree.push(tree);
      } else {
        const checkHeightTree = (it) => tree > it;

        const topCheck = treeGroup
          .filter((_, index) => index < i)
          .map((row) => row[j])
          .every(checkHeightTree);
        const bottomCheck = treeGroup
          .filter((_, index) => index > i)
          .map((row) => row[j])
          .every(checkHeightTree);
        const leftCheck = treeGroup[i]
          .filter((_, index) => index < j)
          .every(checkHeightTree);
        const rightCheck = treeGroup[i]
          .filter((_, index) => index > j)
          .every(checkHeightTree);

        if (topCheck || bottomCheck || leftCheck || rightCheck) {
          isVisibleTree.push(tree);
        }
      }
    }
  }
}
console.log(isVisibleTree.length);
