<script>
  import Accordion from '$lib/Accordion.svelte'
  import Recent from '$lib/home/Recent.svelte'
  const data = {
    'Brand development': [
      "We conduct comprehensive research to understand your business and it's goals. We then audit and analyse collected data to draw consumer insight.",
      'Our creative process begins with logo design. We take time to explore different creative directions so as to come up with a beautiful, simple and memorable logo mark for your business. We carefully select colours and a typeface to uniquely represent your brand.',
      'To finalize the process, we create your branding and identity guide and deliver creative results in relevant format. This marks the foundation of your future business success.',
    ],
    'Graphic design': [
      'Our creative experience helps us create designs that capture your marketing message and catch the eye of your audience. Graphic design is broad and wide but we can help you use it to broaden your brand appeal through creative marketing.',
    ],
    'Web development': [
      'The internet has changed the way we engage with businesses. Your customers expect to find you online. Our web development service helps you take your business online fast and affordably.',
      ' We specialize in modern web technologies that make websites that are super fast and optimized for the modern consumer.',
    ],
    Printing: [
      'We do paper printing like business cards, fliers, posters, brochures, booklets, magazines and many others.',
      'We also print banners like pull-up, hanging banners, tear drop banners, backdrop/media banners among others.',
      'Sometimes you need customized items to promote your brand. We can help you brand writing pads, notebooks, gift bags, folders, t-shirts and many other items.',
    ],
  }

  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import 'swiper/css'
  import 'swiper/css/pagination'

  import SwiperCore, { Mousewheel, Autoplay } from 'swiper'
  SwiperCore.use([Mousewheel, Autoplay])
</script>

<svelte:head>
  <title>High quality graphic design and web design services in Nairobi</title>
  <meta
    name="description"
    content="We are a creative design studio in Nairobi offering graphic design and web development services. We also do printing and branding for startups and corporates. The quality of our work paired with our pricing is simply unmatched. Get in touch with us to see how we can help you."
  />
</svelte:head>

<div class="content-500">
  <h1>Our business is making yours look good</h1>
  <p>
    We provide brand centric graphic design and web development services to
    businesses in East Africa.
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
        spaceBetween: 4.5,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 6,
      },
      1100: {
        slidesPerView: 4,
      },
    }}
    class="mySwiper"
  >
    <SwiperSlide>
      <img src="img/recent/11.jpg" alt="Anchor homes" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/9.jpg" alt="Anchor homes" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/amsco.jpg" alt="amsco" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/6.jpg" alt="liberte juices post" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/liberte.jpg" alt="liberte juices" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/strathmore-3.jpg" alt="strathmore" />
    </SwiperSlide>
  </Swiper>
</div>

<div class="services">
  <h2>Our services</h2>
  <div class="accordion top-margin">
    {#each Object.entries(data) as entry}
      <div class="accordion-entry">
        <Accordion {entry} />
      </div>
    {/each}
  </div>
</div>

<div class="recent">
  <h2>Sample work</h2>
  <p class="top-margin">
    We have been involved in many brand development projects. Below see some
    that we completed recently
  </p>
</div>

<div class="four-way-grid">
  <Recent />
</div>

<div class="clients">
  <h2>Our clients</h2>
  <p class="top-margin">
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
    max-width: 500px;
    margin: 2.7rem auto 0 auto;
    border-radius: 5px;
    overflow: hidden;
  }

  .clients {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: var(--top-margin-mobile);
  }

  .four-way-grid {
    margin-top: 1.5rem;
  }

  .logos {
    width: 100%;
    max-width: 720px;
    margin: auto;
    margin-top: 2rem;
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

  .content img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .accordion {
    width: 100%;
    max-width: 820px;
    margin: auto;
  }

  .accordion-entry {
    background-color: rgba(173, 192, 209, 0.3475);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.485rem;
  }

  .top-margin {
    margin-top: 1.2rem;
  }

  @media (min-width: 768px) {
    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    .content {
      max-width: 1400px;
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

    .top-margin {
      margin-top: 2.2rem;
    }
  }
</style>
