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
</script>

<template>
  <div v-gsap.desktop.timeline.pinned="{ start: 'top top' }" class="p-8">
    <!-- Hero Section -->
    <MainHero v-gsap.desktop.add.to="{ opacity: 0, scale: 0.8 }" />

    <!-- Image Section -->
    <Showcase v-gsap.desktop.add.withPrevious.to="{ y: '-100vh' }" />

    <!-- FAQ Section -->
    <ULandingFAQ
      :items="items"
      v-gsap.desktop.add.withPrevious.to="{ y: '-60vh' }"
    />

    <!-- Newsletter -->
    <Newsletter />
  </div>
</template>
