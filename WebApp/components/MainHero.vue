<template>
  <ULandingSection>
    <template #headline>
      <div
        class="font-thin text-gray-500 text-1xl sm:text-3xl"
        v-gsap.entrance.fade.delay-1000.from="{ duration: 1 }"
      >
        The crypto wallet that
        <UIcon name="i-fa6-solid-recycle" />
        earnings
      </div>
    </template>

    <template #title>
      <div
        class="font-thin md:font-black text-primary text-4xl md:text-9xl"
        v-gsap.entrance.fade.from="{ duration: 2 }"
      >
        Meta<span class="text-black">, but this time</span>
      </div>
      <div
        class="font-thin md:font-black text-primary text-4xl md:text-9xl"
        v-gsap.entrance.fade.from="{ duration: 2 }"
      >
        <span class="text-black">for </span>Pros
      </div>
    </template>

    <template #description>
      <div
        class="p-8 space-y-2"
        v-gsap.entrance.fade.delay-1000.from="{ duration: 1 }"
      >
        <UButton
          v-gsap.magnetic.stronger
          class="rotate-360"
          block
          variant="soft"
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
        >
          <template #leading>
            <NuxtImg preload src="./chrome.svg" />
          </template>
          Join for Airdrop</UButton
        >
        <div class="font-thin text-gray-400 text-sm flex flex-col items-center">
          By using this you agree to our
          <u>Terms of Service</u>
        </div>
      </div>
    </template>
  </ULandingSection>
</template>

<style scoped>
.rotate-360:hover img {
  transition: rotate 1.7s ease-in-out;
  rotate: 720deg;
}
</style>
