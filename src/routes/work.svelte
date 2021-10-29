<script>
  let work = undefined
  import ThreeWayGrid from '$lib/ThreeWayGrid.svelte'
  import TwoWayGrid from '$lib/TwoWayGrid.svelte'
</script>

<svelte:head>
  <title>
    Here we showcase our approach to the brand development project for Anchor
    homes project
  </title>
</svelte:head>

<div class="content-500">
  <h1>Anchor homes branding project</h1>
  <p>
    Anchor approached us to imagine their branding. The main objective was to
    establish a sense of trust and closeness with potential home owners through
    simple and down to earth communication.
  </p>
  <p>
    We have implemented this based on the principle of simplicity and
    recognition.
  </p>
</div>

<article class="width bg-color img-width">
  <div>
    <img src="img/recent/anchor hero.png" alt="anchor" />
  </div>
</article>

<div class="width work-wrapper">
  <div class="recent-work">
    <section class="two-way-grid">
      <TwoWayGrid>
        <div slot="left" class="img-wrapper">
          <img src="img/recent/2.jpg" alt="eaglehr" />
        </div>
        <div slot="right" class="img-wrapper">
          <img src="img/recent/1.jpg" alt="eaglehr" />
        </div>
      </TwoWayGrid>
    </section>
  </div>
</div>

<div class="bg-white width">
  <img src="img/recent/branded.png" alt="anchor one" />
</div>

<div class="width img-width three-way-grid">
  <ThreeWayGrid>
    <img slot="left" src="img/recent/carrier bags.jpg" alt="anchor one" />
    <img slot="center" src="img/recent/brochure.jpg" alt="anchor one" />
    <img slot="right" src="img/recent/7.jpg" alt="anchor tshirt branding" />
  </ThreeWayGrid>
</div>

<style>
  .width {
    width: 100%;
    max-width: 1000px;
    margin: auto;
    margin-top: 0.75rem;
  }

  .bg-color {
    background-color: var(--secondary-color);
    background-color: #180040;
    background-color: #fff;
    padding: 2.5rem 0;
    margin: 2rem auto 0 auto;
  }

  .bg-white {
    background-color: var(--pure-white);
  }

  .bg-white img {
    display: block;
    max-width: 100%;
    margin-left: 0;
  }

  .img-wrapper img {
    display: block;
    width: 100%;
  }

  .bg-color div {
    display: block;
    width: 90%;
    margin: auto;
  }

  .img-width img {
    display: block;
    max-width: 100%;
    margin: auto;
  }

  /* .two-way-grid {
    margin-top: 0.75rem;
  } */

  /* h2 {
    font-size: 1.2rem;
    margin-top: 3rem;
    font-weight: 500;
  } */

  .content-500 {
    width: 100%;
    max-width: var(--column-width);
    max-width: 720px;
    margin: var(--column-margin-top) auto 0 auto;
    margin: 2rem auto 0 auto;
    text-align: center;
  }

  @media (min-width: 768px) {
    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .bg-color {
      margin: var(--column-margin-top) auto 0 auto;
    }
  }
</style>
