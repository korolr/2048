<script>
  export let value;
</script>

<style>
  .cell {
    background-color: #444;
    height: 60px;
    border-radius: 8px;
    padding: 20px;
    font-size: 250%;
    display: flex;
    color: #5da0df;
    align-items: center;
    justify-content: center;
  }

  .null {
    background-color: #cdc0b5;
    height: 60px;
    border-radius: 8px;
    padding: 20px;
    font-size: 150%;
  }

  @media (max-width: 420px) {
    .cell {
      background-color: #444;
      height: 30px;
      border-radius: 8px;
      padding: 20px;
      font-size: 250%;
      display: flex;
      color: #5da0df;
      align-items: center;
      justify-content: center;
    }

    .null {
      background-color: #cdc0b5;
      height: 30px;
      border-radius: 8px;
      padding: 20px;
      font-size: 150%;
    }
  }

  .cell_2048 {
    background-color: #ec4d58;
    color: white;
  }

  .cell_1024 {
    background-color: #ebc84c;
    color: white;
  }

  .cell_512 {
    background-color: #ebc84c;
    color: white;
  }

  .cell_256 {
    background-color: #edcc61;
    color: white;
  }

  .cell_128 {
    background-color: #edcf71;
    color: white;
  }

  .cell_64 {
    background-color: #f65f3a;
    color: white;
  }

  .cell_32 {
    background-color: #f57d5e;
    color: white;
  }

  .cell_16 {
    background-color: #f59563;
    color: white;
  }

  .cell_8 {
    background-color: #f0b07a;
    color: white;
  }

  .cell_4 {
    background-color: #eee0c7;
    color: #776f64;
  }

  .cell_2 {
    background-color: #efe3d9;
    color: #776f64;
  }
</style>

{#if value.block === null}
  <div class="null" />
{:else}
  <div class="cell cell_{value.block}">{value.block}</div>
{/if}
