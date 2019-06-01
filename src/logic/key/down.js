import { spawnCell, checkState } from "..";
import { updateMax } from "../../stores/max";

export function down(data) {
  let isLegal = false;
  function dupDown(i) {
    for (let c = 0; c <= 3; c++) {
      if (c < 3 && data[c][i].block !== null && data[c + 1][i].block === null) {
        data[c + 1][i].block = data[c][i].block;
        data[c][i].block = null;
        isLegal = true;
        for (let n = 0; n <= 3; n++) {
          if (
            n < 3 &&
            data[n][i].block !== null &&
            data[n + 1][i].block === null
          ) {
            data[n + 1][i].block = data[n][i].block;
            data[n][i].block = null;
            isLegal = true;
          }
        }
      }
    }
  }
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      if (j < 3 && data[j][i].block !== null && data[j + 1][i].block === null) {
        data[j + 1][i].block = data[j][i].block;
        data[j][i].block = null;
        isLegal = true;
        dupDown(i);
      } else if (
        j < 3 &&
        data[j][i].block !== null &&
        data[j][i].block === data[j + 1][i].block
      ) {
        data[j + 1][i].block += data[j][i].block;
        data[j][i].block = null;
        isLegal = true;
        updateMax(data[j + 1][i].block);
        dupDown(i);
        if (j + 2 < 3) {
          if (data[j + 2][i].block !== null) {
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
