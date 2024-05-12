import { dirDegrees } from "./degrees.js";

const isRegularGraph = (degrees) => {
    const regular = degrees.every(degree => degree === degrees[0]);
    return { regular, degree: degrees[0] };
};

const dirRegular = isRegularGraph(dirDegrees);

export {dirRegular}