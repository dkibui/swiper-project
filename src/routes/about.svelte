<script context="module">
  import { browser, dev } from '$app/env'
  // we don't need any JS on this page, though we'll load
  // it in dev so that we get hot module replacement...
  export const hydrate = dev
  // ...but if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser
  // since there's no dynamic data here, we can prerender
  // it so that it gets served as a static asset in prod
  export const prerender = true
</script>

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
  <title>About</title>
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

<h2>See recent work...</h2>

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

<style>
  h2 {
    font-size: 1.2rem;
    margin-top: 3rem;
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
    max-width: var(--column-width);
    max-width: 1400px;
    margin: 0.75rem auto 0 auto;
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
