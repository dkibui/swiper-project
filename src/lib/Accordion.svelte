<script>
  import { slide } from 'svelte/transition'
  import { sineInOut, quadInOut } from 'svelte/easing'
  export let entry
  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<div class="btn" on:click={toggle} aria-expanded={isOpen}>
  <svg
    style="tran"
    width="20"
    height="20"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
  >
  <p>{entry[0]}</p>
</div>

{#if isOpen}
  <div class="slide" transition:slide={{ duration: 250, easing: quadInOut }}>
    {#each entry[1] as item}
      <p>{item}</p>
    {/each}
  </div>
{/if}

<style>
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
    background: var(--darker);
    color: var(--text-color);
    font-size: 17px;
    cursor: pointer;
    margin-top: 0.25rem;
    margin-bottom: 0.35rem;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    padding-left: 0.5em;
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
    background-color: rgba(211, 228, 235, 0.325);
    /* outline: 1px solid rgba(176, 215, 228, 0.75); */
    /* border-top-left-radius: 3px;
    border-top-right-radius: 3px; */
  }

  svg {
    transition: transform 0.4s ease-in-out;
  }

  [aria-expanded='true'] svg {
    transform: rotate(0.25turn);
  }
</style>
