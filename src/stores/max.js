import { writable } from "svelte/store";

export const max = writable(0);

export function updateMax(a) {
  max.update(n => {
    if (a > n) {
      return a;
    } else {
      return n;
    }
  });
}
