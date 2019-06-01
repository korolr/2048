import { spawnCell, checkState } from "..";
import { updateMax } from "../../stores/max";

export function up(data) {
  let isLegal = false;
  function dupUp(i) {
    for (let c = 3; c >= 0; c--) {
      if (c > 0 && data[c][i].block !== null && data[c - 1][i].block === null) {
        data[c - 1][i].block = data[c][i].block;
        data[c][i].block = null;
        for (let n = 3; n >= 0; n--) {
          if (
            n > 0 &&
            data[n][i].block !== null &&
            data[n - 1][i].block === null
          ) {
            data[n - 1][i].block = data[n][i].block;
            data[n][i].block = null;
          }
        }
      }
    }
  }

  for (let i = 0; i <= 3; i++) {
    for (let j = 3; j >= 0; j--) {
      if (j > 0 && data[j][i].block !== null && data[j - 1][i].block === null) {
        data[j - 1][i].block = data[j][i].block;
        data[j][i].block = null;
        isLegal = true;
        dupUp(i);
      } else if (
        j > 0 &&
        data[j][i].block !== null &&
        data[j][i].block === data[j - 1][i].block
      ) {
        data[j - 1][i].block += data[j][i].block;
        data[j][i].block = null;
        isLegal = true;
        updateMax(data[j - 1][i].block);
        dupUp(i);
        if (j - 2 > 0) {
          if (data[j - 2][i].block !== null) {
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
