<script>
  import { blur, slide } from 'svelte/transition'
  import { quintOut, quadInOut } from 'svelte/easing'
  let state = false
  let changeState = () => {
    state = !state
  }
</script>

<div class="btn" on:click={changeState}>
  <svg
    class:svg={state}
    style="tran"
    width="20"
    height="17"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
  >
  <p>Brand development services</p>
</div>

{#if state}
  <div transition:slide={{ delay: 25, duration: 400, easing: quadInOut }}>
    <p>
      In the code snippet above, we import the transition functions we’ll be
      using.
    </p>
  </div>
{/if}
<p>Hello world</p>

<style>
  .btn {
    display: flex;
    align-items: center;
    background-color: rgb(125, 183, 202);
    padding: 0.5rem 1.125rem;
    padding-left: 0.425em;
    margin-top: 2rem;
  }

  .btn svg {
    display: inline-block;
    /* background-color: rgb(223, 203, 203); */
  }

  .btn p {
    display: inline-block;
    font-size: 1.1em;
    margin-left: 0.55em;
    /* background-color: rgb(217, 219, 202); */
  }

  div {
    background-color: lightblue;
    padding: 1.2em;
  }

  p {
    text-align: left;
  }

  svg {
    transition: transform 0.4s ease-in-out;
  }

  .svg {
    transform: rotate(0.25turn);
  }
</style>
