import { updateScore } from "../stores/score.js";

export function spawnCell(data) {
  let arr = [
    1.1,
    1.2,
    1.3,
    1.4,
    2.1,
    2.2,
    2.3,
    2.4,
    3.1,
    3.2,
    3.3,
    3.4,
    4.1,
    4.2,
    4.3,
    4.4
  ];
  let bin = [2, 4];
  let val;
  let check = true;
  while (check) {
    var rand = Math.floor(Math.random() * arr.length);
    data[arr[rand].toFixed(0) - 1].map(el => {
      if (el.id === arr[rand] && el.block === null) {
        check = false;
        val = bin[Math.floor(Math.random() * bin.length)];
        updateScore(val);
        return (el.block = val);
      }
    });
  }
  return data;
}

export function checkState(data) {
  let stateIsClear = false;
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      if (data[i][j].block === null) {
        stateIsClear = true;
      }
    }
  }

  if (stateIsClear) {
    return spawnCell(data);
  } else {
    alert("You Lose");
    window.location.reload(false);
  }
}
