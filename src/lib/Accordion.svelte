<script>
  import { slide } from 'svelte/transition'
  import { sineInOut, quadInOut } from 'svelte/easing'
  export let entry
  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<div class="btn" on:click={toggle} aria-expanded={isOpen}>
  <p>{entry[0]}</p>
  <svg class="svg" height="17" width="17">
    <line x1="0" y1="8.5" x2="17" y2="8.5" />
    <line x1="8.5" y1="17" x2="8.5" y2="0" />
  </svg>
</div>

{#if isOpen}
  <div class="slide" transition:slide={{ duration: 250, easing: quadInOut }}>
    {#each entry[1] as item}
      <p>{item}</p>
    {/each}
  </div>
{/if}

<style>
  svg {
    transition: transform 0.4s ease-in-out;
    stroke: #444444;
    stroke-width: 1.725;
  }

  /* .svg:hover {
    transform: rotate(0.125turn);
  } */

  p {
    font-size: 0.97rem;
    padding: 0.75em;
    color: var(--text-color);
    text-align: left;
    line-height: 1.6;
  }

  p:last-child {
    margin-bottom: 1rem;
  }

  div {
    border-radius: 3px;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--darker);
    color: var(--text-color);
    font-size: 17px;
    cursor: pointer;
    margin-top: 0.25rem;
    margin-bottom: 0.35rem;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.75em;
    text-align: left;
  }

  .btn p {
    font-size: 1.0125em;
    font-weight: 500;
    margin: 0;
    margin-left: 0.35em;
    padding: 0;
  }

  .slide {
    /* background-color: rgba(211, 228, 235, 0.625); */
    background-color: rgba(173, 192, 209, 0.2125);
    /* outline: 1px solid rgba(176, 215, 228, 0.75); */
    /* border-top-left-radius: 3px;
    border-top-right-radius: 3px; */
  }

  svg {
    transition: transform 0.4s ease-in-out;
  }

  [aria-expanded='true'] svg {
    transform: rotate(0.875turn);
  }
</style>
