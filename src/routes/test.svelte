<script>
  import Recent from '$lib/home/Recent.svelte'
</script>

<article>
  <div>
    <!-- <slot name="image" /> -->
    <img src="img/recent/11.jpg" alt="9" />
  </div>
  <div>
    <!-- <slot name="description" /> -->
    <p>
      We had the previlege of working with the founder of Anchor homes in the
      process of setting up the brand. In the end we created a very strong brand
      that is visually appealing and instantly recognisable.
    </p>
  </div>
  <div>
    <!-- <slot name="link" /> -->
    <p><a href="/work/anchor">Click here to learn more.</a></p>
  </div>
</article>

<Recent />

<style>
  article {
    /* max-width: 1400px; */
    /* margin: auto; */
    margin-top: 7rem;
  }

  article {
    padding: 0.875rem;
    max-width: 500px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  article img {
    display: block;
    width: 100%;
  }

  article p {
    text-align: left;
  }

  article a {
    display: block;
    text-decoration: none;
  }

  @media (min-width: 768px) {
  }
</style>
