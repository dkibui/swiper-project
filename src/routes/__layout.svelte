<script>
  import Canvas from '$lib/header/Canvas.svelte'
  import '../app.css'
</script>

<Canvas />

<main>
  <slot />
</main>

<footer>
  <p>
    Thank you for visiting. <a href="mailto:dkibui@visign.co.ke">
      Send us an email
    </a>
    to see how we can help.
  </p>
  <div class="social-icons">
    <a href="https://www.behance.net">
      <img src="img/social/behance.png" alt="behance logo" />
    </a>
    <a href="https://www.instagram.com">
      <img src="img/social/instagram.png" alt="instagram logo" />
    </a>
    <a href="https://www.twitter.com">
      <img src="img/social/twitter.png" alt="twitter logo" />
    </a>
  </div>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 92%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;
  }

  footer a {
    font-weight: bold;
    text-decoration: none;
  }

  footer p {
    width: 92%;
    max-width: 1024px;
    margin: 0 auto;
  }

  .social-icons {
    display: flex;
    margin: 2.75rem 0 2.5rem 0;
    gap: 1rem;
  }

  .social-icons img {
    display: block;
    width: 100%;
    max-width: 28px;
  }

  @media (min-width: 480px) {
    /* footer {
      padding: 40px 0;
    } */
  }
</style>
