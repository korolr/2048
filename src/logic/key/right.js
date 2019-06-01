import { spawnCell, checkState } from "..";
import { updateMax } from "../../stores/max";

export function right(data) {
  let isLegal = false;
  function dupRight(i) {
    for (let c = 0; c <= 3; c++) {
      if (c < 3 && data[i][c].block !== null && data[i][c + 1].block === null) {
        data[i][c + 1].block = data[i][c].block;
        data[i][c].block = null;
        isLegal = true;
        for (let n = 0; n <= 3; n++) {
          if (
            n < 3 &&
            data[i][n].block !== null &&
            data[i][n + 1].block === null
          ) {
            data[i][n + 1].block = data[i][n].block;
            data[i][n].block = null;
            isLegal = true;
          }
        }
      }
    }
  }
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      if (j < 3 && data[i][j].block !== null && data[i][j + 1].block === null) {
        data[i][j + 1].block = data[i][j].block;
        data[i][j].block = null;
        isLegal = true;
        dupRight(i);
      } else if (
        j < 3 &&
        data[i][j].block !== null &&
        data[i][j].block === data[i][j + 1].block
      ) {
        data[i][j + 1].block += data[i][j].block;
        data[i][j].block = null;
        isLegal = true;
        updateMax(data[i][j + 1].block);
        dupRight(i);
        if (j + 2 < 3) {
          if (data[i][j + 2].block !== null) {
            ++j;
          } else {
            break;
          }
        }
      }
    }
  }
  if (isLegal) {
    return spawnCell(data);
  } else {
    return checkState(data);
  }
}
