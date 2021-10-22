<script>
  import { page } from '$app/stores'
  import logo from './visign-logo.svg'
</script>

<div class="menu">
  <header>
    <!-- <div class="corner">
      <a href="/">
        <img src={logo} alt="visign logo" />
      </a>
    </div> -->

    <nav>
      <!-- <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
    </svg> -->
      <ul>
        <!-- <li class:active={$page.path === '/'}>
          <a sveltekit:prefetch href="/">Home</a>
        </li> -->
        <li class:active={$page.path === '/work'}>
          <a sveltekit:prefetch href="/work">Work</a>
        </li>
        <li class:active={$page.path === '/'}>
          <a sveltekit:prefetch href="/">
            <img src={logo} alt="visign logo" />
          </a>
        </li>
        <li class:active={$page.path === '/about'}>
          <a sveltekit:prefetch href="/about">About</a>
        </li>
      </ul>
      <!-- <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
    </svg> -->
    </nav>

    <!-- <div class="corner">TODO put something else here? github link?</div> -->
  </header>
</div>

<style>
  .menu {
    /* width: 100%; */
    max-width: 1600px;
    margin: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    /* width: 90%; */
    /* border-bottom: 1px solid cadetblue; */
  }

  /* .corner {
corner
    height: auto;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  */

  nav a {
    display: block;
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: space-between;
    --background: rgba(224, 193, 193, 0.7);
  }

  /* svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  } */

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 2.9em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  }

  li {
    position: relative;
    height: 100%;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--text-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  nav img {
    display: block;
    width: 130px;
  }

  nav img:hover {
    opacity: 0.75;
  }

  a:hover {
    color: var(--accent-color);
  }

  a:focus {
    color: var(--text-color);
  }

  @media (min-width: 650px) {
    nav img {
      width: 150px;
    }

    ul {
      height: 3.5em;
    }
  }
</style>
