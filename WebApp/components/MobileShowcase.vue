<script setup lang="ts">
const urls = [
  "./images/startPage.png",
  "./images/mainWallet.png",
  "./images/lockPage.png",
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

<!-- TODO fix -->
<template>
  <UCarousel
    :items="urls"
    ref="carouselRef"
    arrows
    indicators
    :ui="{
      item: 'basis-full',
    }"
    class="w-full max-w-xs overflow-hidden rounded-2xl"
  >
    <NuxtImg src="/images/mainWallet.png" />
    <NuxtImg src="/images/lockPage.png" />
    <NuxtImg src="/images/startPage.png" />
  </UCarousel>
</template>
