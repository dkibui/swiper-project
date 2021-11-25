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
    /* background-color: var(--pure-white); */
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 14px 10px -10px;
    border: 2px solid rgba(68, 68, 68, 0.082);
    padding-bottom: 1.225rem;
  }

  article div:first-child {
    margin-bottom: 1rem;
  }

  article div:last-child {
    margin-top: auto;
  }

  .img {
    /* border-radius: 5px; */
    overflow: hidden;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  @media (min-width: 768px) {
    article {
      gap: 0.75rem;
    }
  }
</style>
