<script>
  let navOpen = false

  function handleNav(e) {
    e.stopPropagation()
    navOpen = !navOpen
  }

  function handleClick(e) {
    e.stopPropagation()
    const menubtn = document.querySelector('.container')
    if (e.target !== menubtn) {
      if (navOpen) {
        navOpen = false
      }
    }
  }
</script>

<svelte:body on:click={handleClick} />

<div class="navigation">
  <div class="menu">
    <div class="logo">
      <a href="/"><img src="img/visign-logo.svg" alt="visign kenya logo" /></a>
    </div>
    <div class="container" class:change={navOpen} on:click={handleNav}>
      <div class="bar1" />
      <div class="bar2" />
      <div class="bar3" />
    </div>
  </div>

  <div id="mySidenav" class="sidenav" class:open={navOpen}>
    <a href="" class="closebtn" on:click={handleNav}>&times;</a>
    <a href="/" on:click={handleNav}>Home</a>
    <a href="/about" on:click={handleNav}>About</a>
    <a href="/work" on:click={handleNav}>Work</a>
    <!-- <a href="/blog" on:click={handleNav}>Blog</a> -->
    <!-- <a href="/contact" on:click={handleNav}>Contact</a> -->
  </div>
</div>

<style>
  .navigation {
    z-index: 10;
  }

  .menu {
    width: 93%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
  }

  .menu img {
    display: block;
    height: 32px;
  }

  /* Hamburger Menu icon */
  .container {
    cursor: pointer;
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 32px;
    height: 3px;
    background-color: var(--text-color);
    opacity: 85%;
    margin: 8px 0;
    transition: 0.4s;
  }

  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  .change .bar2 {
    opacity: 0;
  }

  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }

  /* The side navigation menu */
  .sidenav {
    height: 100%;
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    opacity: 0.95275;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px;
    transition: 0.5s;
  }

  /* The navigation menu links */
  .sidenav a {
    padding: 28px 8px 28px 32px;
    text-decoration: none;
    font-size: 20px;
    color: var(--text-color);
    display: block;
    transition: 0.3s;
    border-bottom: 1px solid var(--secondary-color);
  }

  .sidenav a:first-child {
    padding-top: 17px;
  }

  .sidenav a:first-child,
  .sidenav a:last-child {
    border-bottom: none;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
    color: var(--accent-color);
  }

  /* Position and style the close button (top right corner) */
  .sidenav .closebtn {
    position: absolute;
    top: -5px;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  .open {
    width: 60%;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media (min-width: 768px) {
    .container {
      display: none;
    }

    .navigation {
      width: 90%;
      max-width: 1600px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: fit-content;
      margin-top: 0.75rem;
    }

    .menu {
      margin: 0;
    }

    .menu img {
      display: block;
      height: 36px;
    }

    .sidenav {
      display: flex;
      height: 100%;
      width: 100%; /* 0 width - change this with JavaScript */
      position: static;
      background-color: transparent;
      padding-top: 0;
      transition: 0s;
      justify-content: flex-end;
    }

    .sidenav a {
      font-size: 18px;
    }

    .sidenav a:first-child {
      display: none;
    }

    .sidenav a {
      margin: 0;
      padding: 0;
      padding-left: 2.4rem;
    }

    .sidenav .closebtn {
      position: static;
      top: 0;
      right: 0;
      font-size: 36px;
      margin-left: 0;
    }
  }
</style>
