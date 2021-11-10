<script>
  let container
  let state = 'open'
  let navOpen = false

  function handleClick(e) {
    e.stopPropagation()
    const button = document.querySelector('.btn')
    if (e.target === button) {
      navOpen = true
      console.log(navOpen, e.target)
    } else {
      navOpen = false
      console.log(navOpen, 'Outside')
    }
  }
</script>

<svelte:body on:click={handleClick} />

<button class="btn" on:click={handleClick}> Click </button>

<!-- <div class={state === 'open' ? 'navOpened' : ''} bind:this={container} /> -->
<style>
  /* div {
    height: 250px;
    background-color: red;
  } */
</style>
