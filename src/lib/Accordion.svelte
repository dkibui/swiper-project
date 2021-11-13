<script>
  import { slide } from 'svelte/transition'
  import { sineInOut, quadInOut } from 'svelte/easing'
  export let entry
  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<div class="btn" on:click={toggle} aria-expanded={isOpen}>
  <p>{entry[0]}</p>
  <svg class="svg" height="12" width="12">
    <line x1="0" y1="6" x2="12" y2="6" />
    <line x1="6" y1="12" x2="6" y2="0" />
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
    stroke: rgb(68, 68, 68, 0.75);
    stroke-width: 1.725;
  }

  p {
    font-size: 0.96rem;
    padding: 0.76em;
    color: var(--text-color);
    text-align: left;
    line-height: 1.6;
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
    margin: 0.385rem 0;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.75em;
    text-align: left;
  }

  .btn p {
    font-size: 1.007125em;
    margin: 0;
    margin-left: 0.35em;
    padding: 0;
  }

  .slide {
    background-color: rgba(173, 192, 209, 0.2125);
  }

  svg {
    transition: transform 0.4s ease-in-out;
  }

  [aria-expanded='true'] svg {
    transform: rotate(0.625turn);
  }

  @media (min-width: 768px) {
    p {
      font-size: 0.97rem;
    }
  }
</style>
