<script>
  let work = undefined
  import ThreeWayGrid from '$lib/ThreeWayGrid.svelte'
  import TwoWayGrid from '$lib/TwoWayGrid.svelte'
</script>

<svelte:head>
  <title>
    Get to see how we approach our brand development projects. Here we showcase
    the Anchor homes branding project.
  </title>
</svelte:head>

<div class="content-500">
  <h1>Anchor homes branding</h1>
  <p>
    Anchor approached us to imagine their branding. For this project we wanted
    to create a brand that is emotional and caring. A brand that lets you know
    we've got your back.
  </p>
  <!-- <p>
    We hope to establish trust with potential home owners by using simple and
    down to earth communication.
  </p> -->
</div>

<article class="width bg-color img-width hero">
  <div>
    <img src="img/recent/anchor hero.png" alt="anchor" />
  </div>
</article>

<div class="intersection width">
  <h2>Our identity</h2>
  <p>
    To establish Anchor's identity we, we selected brand colours and fonts. We
    created brand patterns and established guides on how to use the logo, images
    and colours. Put together these elements create a unique and recognisable
    brand.
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
            src="img/recent/anchor-advert.jpg"
            alt="anchor construction advert"
          />
        </div>
      </TwoWayGrid>
    </section>
  </div>
</div>

<div class="intersection width">
  <h2>Identity and application</h2>
  <p>
    Anchor's logo is versatile and adaptable in it's application. It works well
    in various forms of marketing communication.
  </p>
</div>

<div class="bg-white width">
  <img src="img/recent/branded.jpg" alt="anchor one" />
</div>

<div class="width img-width three-way-grid">
  <ThreeWayGrid>
    <img slot="left" src="img/recent/carrier bags.jpg" alt="anchor one" />
    <img slot="center" src="img/recent/anchor-cap.jpg" alt="anchor one" />
    <img slot="right" src="img/recent/7.jpg" alt="anchor tshirt branding" />
  </ThreeWayGrid>
</div>

<div class="width work-wrapper">
  <div class="recent-work">
    <section class="two-way-grid">
      <TwoWayGrid>
        <div slot="left" class="img-wrapper">
          <img
            src="img/recent/hanging-banner.jpg"
            alt="anchor hanging banner"
          />
        </div>
        <div slot="right" class="img-wrapper">
          <img src="img/recent/giftbags.jpg" alt="anchor helmet" />
        </div>
      </TwoWayGrid>
    </section>
  </div>
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

  .intersection p {
    margin-top: 0.75rem;
  }

  .bg-color {
    background-color: var(--secondary-color);
    background-color: #180040;
    background-color: #fff;
    padding: 2.5rem 0;
    margin: 3rem auto 0 auto;
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

    .intersection p {
      margin-left: auto;
      margin-right: auto;
      max-width: 720px;
    }

    .img-width img {
      max-width: 100%;
    }
  }
</style>
