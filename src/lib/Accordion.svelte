<script>
  import { slide } from 'svelte/transition'
  import { sineIn, circOut, circIn } from 'svelte/easing'
  export let entry
  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<div class="btn" on:click={toggle} aria-expanded={isOpen}>
  <p>{entry[0]}</p>
  <div class="svg-div">
    <svg class="svg" height="12" width="12">
      <line x1="0" y1="6" x2="12" y2="6" />
      <line x1="6" y1="12" x2="6" y2="0" />
    </svg>
  </div>
</div>

{#if isOpen}
  <div class="slide" transition:slide={{ duration: 400, easing: sineIn }}>
    {#each entry[1] as item}
      <p>{item}</p>
    {/each}
  </div>
{/if}

<style>
  svg {
    transition: transform 0.4s ease-in-out;
    stroke: rgb(68, 68, 68, 0.75);
    stroke-width: 1.725;
    margin: 0.96em;
  }

  .svg-div {
    height: 100%;
    transition: background-color 0.4s ease-in-out;
  }

  p {
    font-size: 0.96rem;
    padding: 0.96em;
    color: var(--text-color);
    text-align: left;
    line-height: 1.6;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--darker);
    color: var(--text-color);
    font-size: 17px;
    cursor: pointer;
    padding-left: 0.5em;
    /* padding-right: 0.75em; */
    text-align: left;
  }

  .btn p {
    font-size: 1.007125em;
    margin: 0;
    margin-left: 0.35em;
    padding: 0;
  }

  svg {
    transition: transform background-color 0.4s ease-in-out;
  }

  [aria-expanded='true'] .svg-div {
    background-color: var(--tertiary-color);
    background-color: #44444425;
    /* background-color: #ffffff71; */
  }

  [aria-expanded='true'] svg {
    transform: rotate(0.375turn);
    stroke: rgb(0, 0, 0);
  }

  @media (min-width: 768px) {
    p {
      font-size: 0.97rem;
    }
  }
</style>
