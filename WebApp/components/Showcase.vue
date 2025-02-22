<template>
  <div
    class="h-dvh flex flex-col items-center"
    v-gsap.desktop.add.withPrevious.to="{ scale: 0.9 }"
  >
    <!-- Desktop Section -->
    <div class="flex h-dvh w-screen flex-row relative hidden sm:block">
      <NuxtImg
        v-gsap.desktop.add.withPrevious.to="{ x: '-125%' }"
        preload
        draggable="false"
        src="/images/startPage.png"
        class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_8px_16px_20px_0vw] hidden sm:block rounded-2xl"
      />
      <NuxtImg
        preload
        draggable="false"
        src="/images/mainWallet.png"
        class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[0px_16px_20px_0vw_rgba(0,0,0,0.3)] rounded-2xl"
      />
      <NuxtImg
        v-gsap.desktop.add.withPrevious.to="{ x: '125%' }"
        preload
        draggable="false"
        src="/images/lockPage.png"
        class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_-8px_20px_20px_0vw] hidden sm:block rounded-2xl"
      />
    </div>

    <!-- Mobile Section -->
    <MobileShowcase class="sm:hidden my-4" />

    <!-- Text Section -->
    <div class="flex flex-col text-center">
      <span class="font-bold text-5xl hidden sm:block"> MEV Wallet </span>
      <span class="text-gray-500 text-xl md:text-2xl">
        Your transactions are not just secure—They're profitable.
      </span>
    </div>
  </div>
</template>
