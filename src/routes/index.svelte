<script>
  import Accordion from '$lib/Accordion.svelte'
  import FourWayGrid from '$lib/FourWayGrid.svelte'
  // import RecentComponent from '$lib/RecentComponent.svelte'
  import Recent from '$lib/home/Recent.svelte'
  const data = {
    'Brand development': [
      "We perform an exhaustive fact finding mission to understand your business and it's goals. We then audit, research and analyse collected data to draw consumer insight.",
      'The creative process begins with logo design. We take time to create beautifully simple and memorable logo marks. We carefully select typefaces and colour palette that perfectly and uniquely represent your brand.',
      'In the final stage we create branding and identity guides. We deliver creative results in relevant format. This stage marks the initial steps towards your future business success.',
    ],
    'Graphic design': [
      'We create visual content to communicate your marketing messages.',
      'Visual identity system e.g. logo, typography, colour, brand elements like patterns, templates and mock-ups.',
      'Brand attributes and voice definition aka visual identity.',
      'Brand promotional material like Business cards, Letterheads, Posters, Fliers, Banners, Accounting Stationery and social media posts.',
    ],
    'Web development': [
      'Prevalence of the internet has changed the way consumers engage with businesses. Basically, you gotta be online.',
      'We specialize in modern web technologies. We make use of modern UI/UX.',
      'We create Single Page Apps, (SPAs) for websites that act and feel like smartphone apps.',
      'Basically, we start every project from the ground up. That means we can customize the website to look and feel exactly as we want.',
    ],
    'Branding services': [
      'This involves printing, engraving, cutting or pasting any of your brand identity onto promotional items like biro pens, T-shirts, carrier bags and many more.',
    ],
    Printing: [
      'We do paper printing like business cards, fliers, posters, brochures, booklets, magazines among others.',
      'We do print banners like Pull up banners, hanging banners, tear drop banners, backdrop/media banners and others.',
      'We also do branding for gift items like carrier bags, biro pens, mags among others.',
    ],
  }

  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import 'swiper/css'
  import 'swiper/css/pagination'

  import SwiperCore, { Mousewheel, Autoplay } from 'swiper'
  SwiperCore.use([Mousewheel, Autoplay])
</script>

<svelte:head>
  <title>
    Affordable high quality graphic design and web development services in
    Kenya.
  </title>
  <!-- <description>
    All the graphic design and web development services to take your business to
    the next level.
  </description> -->
</svelte:head>

<div class="content-500">
  <h1>Our business is making yours look good.</h1>
  <p>
    We provide brand centred graphic design and web development services to SMEs
    and corporates in Nairobi.
  </p>
</div>

<div class="content">
  <Swiper
    slidesPerView={3}
    spaceBetween={10}
    slidesPerGroup={1}
    mousewheel={false}
    loop={true}
    loopFillGroupWithBlank={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      '@0.00': {
        slidesPerView: 2,
        spaceBetween: 9,
      },
      768: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
    }}
    class="mySwiper"
  >
    <SwiperSlide>
      <img src="img/recent/8.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/2.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/11.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/9.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/55.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/6.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/liberte.jpg" alt="" />
    </SwiperSlide>
  </Swiper>
</div>

<div class="services">
  <h2>Our services</h2>
  <div class="accordion">
    {#each Object.entries(data) as entry}
      <Accordion {entry} />
    {/each}
  </div>
</div>

<div class="recent">
  <h2>Recent projects</h2>
  <p class="recent__text">
    We handle many full brand development projects. Below we showcase the ones
    we completed recently
  </p>
</div>

<div class="four-way-grid">
  <Recent />
</div>

<div class="clients">
  <h2>Our clients</h2>
  <p>
    We work with companies of all sizes. Start-ups, SMES or corporates.
    Regardless of your size our goal is always the same, do work that helps you
    stand out in the market place.
  </p>
</div>

<div class="logos">
  <Swiper
    slidesPerView={3}
    spaceBetween={20}
    slidesPerGroup={1}
    mousewheel={false}
    loop={true}
    loopFillGroupWithBlank={true}
    autoplay={{
      delay: 1800,
      disableOnInteraction: false,
    }}
    breakpoints={{
      '@0.00': {
        slidesPerView: 4,
        spaceBetween: 60,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 155,
      },
    }}
    class="mySwiper"
  >
    <SwiperSlide>
      <img src="img/logos/amsco.png" alt="amsco logo" />
    </SwiperSlide>
    <!--  -->
    <SwiperSlide>
      <img src="img/logos/anchor.png" alt="Anchor builders logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/strathmore.png" alt="Strathmore University logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/eaglehr.png" alt="Eaglehr kenya logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/absa.png" alt="absa bank logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/farmhouse.png" alt="farmhouse sacco logo" />
    </SwiperSlide>
  </Swiper>
</div>

<style>
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .content-500 {
    width: 100%;
    max-width: var(--column-width);
    max-width: 530px;
    margin: var(--top-margin-mobile) auto 0 auto;
    text-align: center;
  }

  .content-500 p {
    margin-top: 1rem;
  }

  .services {
    margin-top: var(--top-margin-mobile);
  }

  .content {
    width: 100%;
    max-width: 1400px;
    margin: 2.7rem auto 0 auto;
  }

  .clients {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: var(--top-margin-mobile);
  }

  .clients p {
    margin-top: 1rem;
  }

  .four-way-grid {
    margin-top: 2rem;
  }

  .four-way-grid img {
    display: block;
    width: 100%;
  }

  .logos {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: 2rem;
    /* border-top: 1px solid var(--primary-color); */
    /* border-bottom: 1px solid var(--primary-color); */
    /* padding-top: 0.75rem; */
    /* padding-bottom: 0.65rem; */
  }

  img {
    display: block;
    max-width: 100%;
  }

  .recent {
    width: 100%;
    margin: auto;
    margin-top: var(--top-margin-mobile);
  }

  .recent p {
    margin-top: 1rem;
  }

  .content img {
    display: block;
    width: 100%;
    height: auto;
  }

  .accordion {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: 1.2rem;
  }

  @media only screen and (min-width: 568px) {
    h1 {
      font-size: 2.5em;
      line-height: 1.3;
    }
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 1.6rem;
    }

    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .content {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .accordion {
      margin-top: 1.2rem;
    }

    .logos {
      max-width: 720px;
      margin-top: 2.2rem;
      padding-top: 1.5rem;
      padding-bottom: 1.2rem;
    }

    .services {
      margin-top: var(--column-margin-top);
    }

    .clients {
      margin-top: var(--column-margin-top);
    }

    .recent {
      max-width: 1440px;
      margin-top: var(--column-margin-top);
    }
  }
</style>
