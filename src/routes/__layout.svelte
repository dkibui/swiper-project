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
  <div class="copyright">
    <p>Designed by Visign © {new Date().getFullYear()}</p>
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
    margin-top: var(--top-margin-mobile);
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 2.54rem;
    gap: 1rem;
  }

  .social-icons img {
    display: block;
    width: 100%;
    max-width: 28px;
  }

  .copyright {
    display: block;
    width: 100%;
    background-color: var(--secondary-color);
    padding: 0.75rem 0;
    margin-top: 1.75rem;
  }

  .copyright p {
    text-align: center;
  }

  @media (min-width: 768px) {
    footer {
      padding-top: var(--column-margin-top);
    }

    .copyright p {
      text-align: center;
      font-size: 0.925rem;
    }
  }
</style>
