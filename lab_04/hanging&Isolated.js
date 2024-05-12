import { dirDegrees } from './degrees.js';

const findHangingAndIsolatedVertices = (degrees) => {
    const hangingVertices = [];
    const isolatedVertices = [];

    degrees.forEach((degree, index) => {
        if (degree === 1) {
            hangingVertices.push(index + 1);
        } else if (degree === 0) {
            isolatedVertices.push(index + 1);
        }
    });

    return { hangingVertices, isolatedVertices };
}

const dirVertices = findHangingAndIsolatedVertices(dirDegrees);

export { dirVertices }