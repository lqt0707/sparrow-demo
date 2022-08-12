import { reflectX, translate, transpose as transposeT } from "./transforms";
import { curry } from "./utils";

function coordinate(transformOptions, canvasOptions) {
  return [transposeT(), translate(-0.5, -0.5), reflectX(), translate(0.5, 0.5)];
}

export const transpose = curry(coordinate);
