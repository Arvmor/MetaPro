<script setup>
const items = [
  {
    label: "How do I join the airdrop?",
    content: 'Click the "Join for Airdrop" button and follow the instructions.',
  },
  {
    label: "What is Private Transaction?",
    content:
      "Private transactions are directly sent to miners, bypassing the mempool. This reduces the risk of frontrunning and MEV.",
  },
];

const testimonials = [
  {
    icon: "i-simple-icons-x",
    quote:
      "One of the best Ethereum Wallets I have ever used. It is simple, fast, and secure.",
    author: {
      name: "Poopie",
      description: "Founder of Doodles",
      to: "https://x.com/TheMetaPro",
      avatar: "/images/doodles.jpeg",
    },
  },
  {
    icon: "i-simple-icons-x",
    quote:
      "AirDrops are the future of crypto. I am excited to see what TheMetaPro has in store for us.",
    author: {
      name: "Samuel",
      description: "CTO of RTFKT",
      to: "https://x.com/TheMetaPro",
      avatar: "/images/rtfkt.jpg",
    },
  },
  {
    icon: "i-simple-icons-discord",
    quote:
      "I have been using MetaPro for a while now and I am impressed with the speed and security.",
    author: {
      name: "Zagabond",
      description: "Founder of Azuki",
      to: "https://x.com/TheMetaPro",
      avatar: "/images/azuki.jpg",
    },
  },
];

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>

<template>
  <div v-gsap.desktop.timeline.pinned="{ start: 'top top' }" class="p-8">
    <!-- Hero Section -->
    <MainHero v-gsap.desktop.add.to="{ opacity: 0, scale: 0.8 }" />

    <!-- Image Section -->
    <Showcase
      v-gsap.desktop.add.withPrevious.to="{ y: '-100vh', scale: 0.9 }"
    />

    <!-- FAQ Section -->
    <ULandingFAQ
      :items="items"
      v-gsap.desktop.add.withPrevious.to="{ y: '-60vh' }"
    />

    <!-- Testimonials Section -->
    <UCarousel
      v-gsap.desktop.add.withPrevious.to="{ y: '-35vh' }"
      :items="testimonials"
      ref="carouselRef"
      v-slot="{ item }"
      indicators
      :ui="{
        item: 'basis-full justify-center px-2',
        container: 'py-8',
        indicators: {
          wrapper: 'bottom-auto top-0',
        },
      }"
    >
      <ULandingTestimonial
        :icon="item.icon"
        :quote="item.quote"
        :author="{
          name: item.author.name,
          description: item.author.description,
          to: item.author.to,
          avatar: { src: item.author.avatar, loading: 'lazy' },
          target: '_blank',
        }"
        card
      />
    </UCarousel>

    <!-- Newsletter -->
    <Newsletter />
  </div>
</template>
