<script>
  let work = undefined
  import ThreeWayGrid from '$lib/ThreeWayGrid.svelte'
  import TwoWayGrid from '$lib/TwoWayGrid.svelte'
</script>

<svelte:head>
  <title>
    Here we showcase our approach to the brand development project for Anchor
    homes project.
  </title>
</svelte:head>

<div class="content-500">
  <h1>Anchor homes branding project.</h1>
  <p>
    Anchor approached us to imagine their branding. For this project we wanted
    to create a brand that is emotional and caring. A brand that lets you know
    we've got your back.
  </p>
  <p>
    We hope to establish trust with potential home owners by using simple and
    down to earth communication.
  </p>
</div>

<article class="width bg-color img-width hero">
  <div>
    <img src="img/recent/anchor hero.png" alt="anchor" />
  </div>
</article>

<div class="intersection width">
  <h2>Anchor identity</h2>
  <p>
    To establish Anchor's identity we, we carefully selected five colours,
    created a brand pattern, chose a typeface and created a guide on image use.
    All together these elements create a recognisable and unique brand.
  </p>
</div>

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

<div class="width work-wrapper">
  <div class="recent-work">
    <section class="two-way-grid">
      <TwoWayGrid>
        <div slot="left" class="img-wrapper">
          <img src="img/recent/anchor-elements.jpg" alt="anchor" />
        </div>
        <div slot="right" class="img-wrapper">
          <img
            src="img/recent/anchor advert.jpg"
            alt="anchor construction advert"
          />
        </div>
      </TwoWayGrid>
    </section>
  </div>
</div>

<div class="intersection width">
  <h2>Anchor identity application</h2>
  <p>
    We explored different ideas to come up with the brand logo. We then selected
    brand colours and typeface. Below we showcase how we apply the logo to
    different communication medium.
  </p>
</div>

<div class="bg-white width">
  <img src="img/recent/branded.png" alt="anchor one" />
</div>

<div class="width img-width three-way-grid">
  <ThreeWayGrid>
    <img slot="left" src="img/recent/carrier bags.jpg" alt="anchor one" />
    <img slot="center" src="img/recent/anchor-cap.jpg" alt="anchor one" />
    <img slot="right" src="img/recent/7.jpg" alt="anchor tshirt branding" />
  </ThreeWayGrid>
</div>

<div class="width single-img">
  <img src="img/recent/calendar.jpg" alt="anchor one" />
</div>
<div class="width single-img">
  <img src="img/recent/anchor-helmet.jpg" alt="anchor one" />
</div>

<style>
  .width {
    width: 100%;
    max-width: 900px;
    margin: auto;
    margin-top: 0.75rem;
  }

  .intersection {
    margin: var(--top-margin-mobile) auto 1rem auto;
  }

  .intersection h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .intersection p {
    margin-top: 0.75rem;
    /* width: 98%; */
  }

  .single-img img {
    display: block;
    width: 100%;
  }

  .bg-color {
    background-color: var(--secondary-color);
    background-color: #180040;
    background-color: #fff;
    padding: 2.5rem 0;
    margin: var(--top-margin-mobile) auto 0 auto;
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

  .hero img {
    max-width: 65%;
  }

  .content-500 {
    width: 100%;
    max-width: var(--column-width);
    max-width: 720px;
    margin: var(--top-margin-mobile) auto 0 auto;
    text-align: center;
  }

  .content-500 p {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .intersection {
      margin: var(--column-margin-top) auto 1.75rem auto;
    }

    .intersection h2 {
      font-size: 1.6rem;
    }

    .intersection p {
      margin-left: auto;
      margin-right: auto;
      max-width: 720px;
    }

    .bg-color {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .img-width img {
      max-width: 100%;
    }
  }
</style>
