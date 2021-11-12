<script>
</script>

<article>
  <div class="img">
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
    background-color: var(--pure-white);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 14px 10px -10px;
  }

  article div:first-child {
    margin-bottom: 1rem;
  }

  .img {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    article {
      gap: 0.75rem;
    }
  }
</style>
