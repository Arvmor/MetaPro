<script setup lang="ts">
const urls = [
  "./images/mainWallet.png",
  "./images/swapPage.png",
  "./images/invitePage.png",
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
    v-gsap.entrance.fade.delay-1250.from="{ duration: 1.5 }"
    :items="urls"
    ref="carouselRef"
    v-slot="{ item }"
    :ui="{
      item: 'basis-full',
    }"
    class="w-full max-w-xs overflow-hidden rounded-2xl"
  >
    <NuxtImg :src="item" draggable="false" />
  </UCarousel>
</template>
