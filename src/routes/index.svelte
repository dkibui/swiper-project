<script>
  import Accordion from '$lib/Accordion.svelte'
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
    Affordable high quality graphic design and web development services for your
    business.
  </title>
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
        slidesPerView: 5,
      },
    }}
    class="mySwiper"
  >
    <SwiperSlide>
      <img src="img/1.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/2.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/3.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/4.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/5.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/6.jpg" alt="" />
    </SwiperSlide>
  </Swiper>
</div>

<h2>Our services</h2>

<div class="accordion">
  {#each Object.entries(data) as entry}
    <Accordion {entry} />
  {/each}
</div>

<h2>Our clients</h2>

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
        spaceBetween: 26,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 80,
      },
    }}
    class="mySwiper"
  >
    <SwiperSlide>
      <img src="img/logos/Liberte.png" alt="Liberte juices logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/amsco.png" alt="amsco logo" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/logos/strathmore.png" alt="Strathmore University logo" />
    </SwiperSlide>
    <!--  -->
    <SwiperSlide>
      <img src="img/logos/anchor.png" alt="Anchor builders logo" />
    </SwiperSlide>

    <SwiperSlide>
      <img src="img/logos/eaglehr.png" alt="Eaglehr kenya logo" />
    </SwiperSlide>
    <!--  -->
    <SwiperSlide>
      <img src="img/logos/farmhouse.png" alt="farmhouse sacco logo" />
    </SwiperSlide>
  </Swiper>
</div>

<style>
  h2 {
    font-size: 1.2rem;
    margin-top: 3rem;
    margin-bottom: 0;
    font-weight: 500;
  }

  .content-500 {
    width: 100%;
    max-width: var(--column-width);
    max-width: 530px;
    margin: var(--column-margin-top) auto 0 auto;
    margin: 2rem auto 0 auto;
    text-align: center;
  }

  .content {
    width: 100%;
    max-width: 1400px;
    margin: 0.75rem auto 0 auto;
  }

  .logos {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: 1.5rem;
    border-top: 1px solid var(--secondary-color);
    padding-top: 1rem;
  }

  .content img {
    display: block;
    width: 100%;
    height: auto;
  }

  .logos img {
    display: block;
    height: 100%;
    width: 100%;
    max-width: 100px;
  }

  .accordion {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: 1rem;
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
      margin-top: 5rem;
    }

    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .content {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .accordion {
      margin-top: 2.2rem;
    }

    .logos {
      margin-top: 2.2rem;
      padding-top: 1.5rem;
      border-bottom: 1px solid var(--secondary-color);
      padding-bottom: 1.2rem;
    }
  }
</style>
