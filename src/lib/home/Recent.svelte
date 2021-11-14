<script>
  import RecentCard from '$lib/RecentCard.svelte'
  import FourWayGrid from '$lib/FourWayGrid.svelte'

  const cards = [
    {
      image: 'img/recent/anchor.jpg',
      alt: 'Anchor logo',
      description:
        'We recently worked with the founder of Anchor homes to help bring his brand to life. Learn more about this project...',
      link: 'Learn more',
      slot: 'one',
    },
    {
      image: 'img/recent/liberte_project.jpg',
      alt: 'liberte logo',
      description:
        'Liberte juices helps you liberate your thirst while boosting your health. This was a fun project to work on. See more details here...',
      link: 'Learn more',
      slot: 'two',
    },
    {
      image: 'img/recent/imexafrica.jpg',
      alt: 'Imex Africa logo',
      description:
        'Imex is a pan african civil engineering firm that specializes in supplies, construction and consultancy. See details...',
      link: 'Learn more',
      slot: 'three',
    },
    {
      image: 'img/recent/eaglehr.jpg',
      alt: 'eaglehr kenya logo',
      description:
        "Africa's economies are on the rise and Eaglehr is on the forefront of ensuring the labour market matches expected...",
      link: 'Learn more',
      slot: 'four',
    },
  ]
</script>

<FourWayGrid>
  {#each cards as card}
    <RecentCard>
      <img slot="image" src={card.image} alt={card.alt} />
      <p slot="description">{card.description}</p>
      <a slot="link" href="/work">{card.link}</a>
    </RecentCard>
  {/each}
</FourWayGrid>

<style>
  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
    transition: transform 400ms ease-in-out;
  }

  p {
    text-align: left;
  }

  a {
    color: var(--text-color);
    font-weight: 600;
    text-decoration: none;
  }

  @media (min-width: 768px) {
    img:hover {
      /* W3C */
      transform: scale(1.055);
      /* Safari & Chrome */
      -webkit-transform: scale(1.055);
      /* Firefox */
      -moz-transform: scale(1.055);
      /* -moz-transform: scale(1.055) rotate(1deg); */
    }
  }
</style>
