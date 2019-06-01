<script>
  import { onMount } from "svelte";
  import { spawnCell } from "../logic";
  import { left } from "../logic/key/left";
  import { right } from "../logic/key/right";
  import { up } from "../logic/key/up";
  import { down } from "../logic/key/down";

  import { score } from "../stores/score.js";
  import { max } from "../stores/max.js";
  import Xwiper from "xwiper";

  import Cell from "../components/Cell.svelte";

  let state = [
    [
      { id: 1.1, block: null },
      { id: 1.2, block: null },
      { id: 1.3, block: null },
      { id: 1.4, block: null }
    ],
    [
      { id: 2.1, block: null },
      { id: 2.2, block: null },
      { id: 2.3, block: null },
      { id: 2.4, block: null }
    ],
    [
      { id: 3.1, block: null },
      { id: 3.2, block: null },
      { id: 3.3, block: null },
      { id: 3.4, block: null }
    ],
    [
      { id: 4.1, block: null },
      { id: 4.2, block: null },
      { id: 4.3, block: null },
      { id: 4.4, block: null }
    ]
  ];

  const xwiper = new Xwiper("body");

  xwiper.onSwipeLeft(() => (state = left(state)));
  xwiper.onSwipeRight(() => (state = right(state)));
  xwiper.onSwipeUp(() => (state = up(state)));
  xwiper.onSwipeDown(() => (state = down(state)));

  function handleKey(event) {
    switch (event.keyCode) {
      case 37:
        state = left(state);
        break;
      case 38:
        state = up(state);
        break;
      case 39:
        state = right(state);
        break;
      case 40:
        state = down(state);
        break;
    }
  }

  onMount(() => {
    state = spawnCell(state);
    state = spawnCell(state);
  });
</script>

<style>
  :global(body) {
    background-color: #eecd5f;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }

  .row {
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-gap: 10px;
    padding: 10px;
    background-color: #b29f7f;
    border-radius: 5px;
  }

  @media (max-width: 420px) {
    .row {
      display: grid;
      grid-template-columns: 70px 70px 70px 70px;
      grid-gap: 8px;
      padding: 10px;
      background-color: #b29f7f;
      border-radius: 5px;
    }
  }

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
</style>

<svelte:window on:keydown={handleKey} />

<h1>Hello 2048</h1>
<h2>Score {$score}</h2>
{#if $max === 2048}
  <h2>You Win!</h2>
{/if}
<div class="container">
  <div class="row">
    {#each state as row}
      {#each row as cell (cell.id)}
        <Cell value={cell} />
      {/each}
    {/each}
  </div>
</div>
