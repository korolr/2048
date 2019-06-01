import { writable } from "svelte/store";

export const score = writable(0);

export function updateScore(a) {
  score.update(n => n + a);
}
