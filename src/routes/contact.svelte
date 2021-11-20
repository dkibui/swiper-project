<svelte:head>
  <title
    >We have 7 years of providing affordable high quality branding services to
    small and SMEs in Kenya.
  </title>
</svelte:head>

<div class="content-500">
  <h1>Contact us</h1>
  <p>
    We're here for you. To see how we can help you, talk to us or send us an
    email
  </p>
  <p>
    Our desire is to help you brand your business at a price you can afford.
    We're really excited to work with you so feel free to give us a call. Your
    journey to the next level begins here
  </p>
  <a href="mailto:dkibui@visign.co.ke"> <button>Email us</button> </a>

  <p class="contacts">
    Cell: +254 728 49 4090 <br /> Email: dkibui@visign.co.ke <br /> Office: 6th
    Floor, Westend <br />
    Towers. Westlands Nairobi.
  </p>
</div>

<style>
  button {
    display: block;
    padding: 0.85em 2.5em;
    border: none;
    border-radius: 100px;
    background-color: var(--accent-color);
    color: var(--pure-white);
    margin: 2em 0;
  }

  button:hover {
    cursor: pointer;
  }

  p:first-of-type {
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

  @media (min-width: 768px) {
    .content-500 {
      margin: var(--column-margin-top) auto 0 auto;
    }

    button {
      margin: 3.2em auto;
    }

    p:first-of-type {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
</style>
