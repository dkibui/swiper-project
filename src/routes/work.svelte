<script>
  import ThreeWayGrid from '$lib/ThreeWayGrid.svelte'
  import TwoWayGrid from '$lib/TwoWayGrid.svelte'
</script>

<svelte:head>
  <title>Check out our design portfolio here</title>
  <meta
    name="description"
    content="We are a creative design studio in Nairobi offering graphic design and web development services. We also do printing and branding for startups and corporates. The quality of our work paired with our pricing is simply unmatched. Get in touch with us to see how we can help you."
  />
</svelte:head>

<div class="hero-image">
  <h1>Our design portfolio</h1>
  <p>
    We had the privilege to work on some amazing design projects over the years.
    Get to see some of our recent design work here.
  </p>
</div>

<div class="container">
  <h2>Logos</h2>
  <p>
    Logo is the most visible among your identity elements. No wonder it takes
    the most time when developing a visual brand.
  </p>
  <p>
    A good logo should be simple in appearance and easy to remember. Visual
    appeal is cool too.
  </p>
  <section class="fourwaygrid">
    <div><img src="img/recent/anchor.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/eaglehr.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/imexafrica.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/liberte_project.jpg" alt="anchor logo" /></div>
  </section>
</div>

<div class="container">
  <section class="twofronefr">
    <div><img src="img/recent/anchor.png" alt="anchor logo" /></div>
    <div><img src="img/recent/giftbags.jpg" alt="anchor logo" /></div>
  </section>
</div>
<div class="container">
  <h2>Social media posts</h2>
  <p>
    The importance of social media for marketing has exploded in the last
    decade. We will help you market to your target audience through creative
    posts.
  </p>
  <section class="threewaygrid">
    <div><img src="img/recent/liberte.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/11.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/6.jpg" alt="anchor logo" /></div>
  </section>
</div>

<div class="container">
  <h2>Branding</h2>
  <p>
    We specialize in mercherndise design and supply. Merch distribution is a
    marketing gift that keeps giving. Get your merch from us today.
  </p>
  <section class="threewaygrid">
    <div><img src="img/recent/carrier bags.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/9.jpg" alt="anchor logo" /></div>
    <div><img src="img/recent/anchor-cap.jpg" alt="anchor logo" /></div>
  </section>
</div>

<style>
  .hero-image {
    margin-top: var(--top-margin-mobile);
  }

  p {
    max-width: 560px;
    margin: 0 auto;
    margin-top: 1rem;
  }

  h2 {
    max-width: 560px;
    margin: 0 auto;
    margin-top: 3rem;
  }

  img {
    display: block;
    max-width: 100%;
    /* margin-top: auto; */
  }

  div {
    border-radius: 5px;
    overflow: hidden;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
  }

  .fourwaygrid {
    display: grid;
    gap: 0.25rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1.25rem;
  }

  .twofronefr {
    display: grid;
    gap: 0.25rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 5rem;
  }

  .threewaygrid {
    display: grid;
    gap: 0.25rem;
    grid-template-columns: repeat(1, 1fr);
    margin-top: 1.25rem;
  }

  .container div {
    background-color: white;
  }

  @media (min-width: 768px) {
    .hero-image {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .fourwaygrid {
      gap: 0.45rem;
      grid-template-columns: repeat(2, 1fr);
      margin-top: 2.25rem;
    }

    .twofronefr {
      display: grid;
      gap: 0.45rem;
      grid-template-columns: 2fr 1fr;
    }

    .threewaygrid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.45rem;
      margin-top: 2.25rem;
    }
  }

  @media (min-width: 1080px) {
    .fourwaygrid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
