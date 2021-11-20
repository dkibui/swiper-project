<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import 'swiper/css'
  import 'swiper/css/pagination'

  // import Swiper core and required modules
  import SwiperCore, { Autoplay, Navigation } from 'swiper'

  // install Swiper modules
  SwiperCore.use([Autoplay, Navigation])
</script>

<svelte:head>
  <title
    >We have 7 years of providing affordable high quality branding services to
    small and SMEs in Kenya.
  </title>
  <!-- <description
    >All graphic design and web development services to take your business to
    the next level
  </description> -->
</svelte:head>

<div class="content-500">
  <h1>About Us</h1>
  <p>
    When we started in 2014, we set out to provide high quality graphic design
    and printing services to SMEs in Kenya.
  </p>
  <p>
    As we have grown so has our service offering. Now we also offer brand
    development, website development and branding of marketing supplies.
  </p>
</div>

<div class="sample">
  <h2>Sample recent work...</h2>
</div>

<div class="content">
  <Swiper
    slidesPerView={3}
    spaceBetween={10}
    slidesPerGroup={1}
    loop={true}
    loopFillGroupWithBlank={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    breakpoints={{
      '@0.00': {
        slidesPerView: 1,
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
      <img src="img/recent/anchor-cap.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/carrier bags.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/9.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/hanging-banner.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/5.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="img/recent/anchor-advert.jpg" alt="" />
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

  .sample {
    margin-top: var(--top-margin-mobile);
  }

  .content {
    width: 100%;
    max-width: var(--column-width);
    max-width: 1400px;
    margin: 1.75rem auto 0 auto;
  }

  .content img {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    /* .content {
      margin: var(--column-margin-top) auto 0 auto;
    } */
  }
</style>
