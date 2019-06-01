import { spawnCell, checkState } from "..";
import { updateMax } from "../../stores/max";

export function left(data) {
  let isLegal = false;
  function dupLeft(i) {
    for (let c = 3; c >= 0; c--) {
      if (c > 0 && data[i][c].block !== null && data[i][c - 1].block === null) {
        data[i][c - 1].block = data[i][c].block;
        data[i][c].block = null;
        for (let n = 3; n >= 0; n--) {
          if (
            n > 0 &&
            data[i][n].block !== null &&
            data[i][n - 1].block === null
          ) {
            data[i][n - 1].block = data[i][n].block;
            data[i][n].block = null;
          }
        }
      }
    }
  }

  for (let i = 0; i <= 3; i++) {
    for (let j = 3; j >= 0; j--) {
      if (j > 0 && data[i][j].block !== null && data[i][j - 1].block === null) {
        data[i][j - 1].block = data[i][j].block;
        data[i][j].block = null;
        isLegal = true;
        dupLeft(i);
      } else if (
        j > 0 &&
        data[i][j].block !== null &&
        data[i][j].block === data[i][j - 1].block
      ) {
        data[i][j - 1].block += data[i][j].block;
        data[i][j].block = null;
        isLegal = true;
        updateMax(data[i][j - 1].block);
        dupLeft(i);
        if (j - 2 > 0) {
          if (data[i][j - 2].block !== null) {
            --j;
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
