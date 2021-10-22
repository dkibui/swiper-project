<section>
  <div>
    <slot name="left" />
  </div>
  <div>
    <slot name="right" />
  </div>
</section>

<style>
  section {
    max-width: 1400px;
    margin: auto;
  }

  section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
