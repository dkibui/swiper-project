<script>
  import { slide } from 'svelte/transition'
  export let entry
  let isOpen = false
  const toggle = () => (isOpen = !isOpen)
</script>

<button on:click={toggle} aria-expanded={isOpen}
  ><svg
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
  {entry[0]}
</button>

{#if isOpen}
  <div transition:slide={{ duration: 300 }}>
    {#each entry[1] as item}
      <p>{item}</p>
    {/each}
  </div>
{/if}

<style>
  p {
    font-size: 0.97rem;
    margin-left: 1.2rem;
    margin-right: 0.75rem;
    margin-top: 0.95rem;
    color: var(--text-color);
    text-align: left;
    line-height: 1.6;
  }

  p:last-child {
    margin-bottom: 1rem;
  }

  button {
    border: 1px solid rgba(130, 153, 130, 0.336);
    border: none;
    border-radius: 5px;
    background: var(--darker);
    display: block;
    width: 100%;
    color: var(--text-color);
    font-size: 17px;
    cursor: pointer;
    margin: 0.25rem 0;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    padding-left: 0.5em;
    text-align: left;
  }

  svg {
    transition: transform 0.2s ease-in;
  }

  [aria-expanded='true'] svg {
    transform: rotate(0.25turn);
  }
</style>
