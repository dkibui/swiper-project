<section>
  <slot />
  <!-- <div>
    <slot name="one" />
  </div>
  <div>
    <slot name="two" />
  </div>
  <div>
    <slot name="three" />
  </div>
  <div>
    <slot name="four" />
  </div> -->
</section>

<style>
  section {
    max-width: 1400px;
    margin: auto;
  }

  section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.2rem;
    column-gap: 0.25rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  @media (min-width: 1068px) {
    section {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
