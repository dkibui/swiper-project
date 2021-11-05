<script>
  export let img = 'img'
</script>

<article>
  <div class={img}>
    <slot name="image" />
  </div>
  <div>
    <slot name="description" />
  </div>
  <div>
    <slot name="link" />
  </div>
</article>

<style>
  article {
    padding: 0.875rem;
    max-width: 500px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .img {
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    overflow: hidden;
    margin-bottom: 1rem;
    -webkit-box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.589);
    -moz-box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.589);
    box-shadow: 0 8px 10px -6px rgba(0, 0, 0, 0.589);
  }

  @media (min-width: 768px) {
  }
</style>
