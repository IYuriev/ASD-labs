import { strongConnectivityMatrix } from './strongConnectivityMatrix.js'

const findDuplicateColumns = (matrix) => {
    const columnIndices = {};

    for (let i = 0; i < matrix[0].length; i++) {
        const columnKey = matrix.map(row => row[i]).join('');
        if (columnIndices[columnKey]) {
            columnIndices[columnKey].push(i);
        } else {
            columnIndices[columnKey] = [i];
        }
    }

    return Object.values(columnIndices).filter(indices => indices.length > 1);
}

const duplicateColumns = findDuplicateColumns(strongConnectivityMatrix);

const strongItems = Array.from({ length: 12 }, (item, i) => i)
    .filter(i => !duplicateColumns.flat().includes(i))
    .map(item => [item]);

const strongItemsArr = strongItems.concat(duplicateColumns).sort((a, b) => a[0] - b[0]);

export {strongItemsArr}