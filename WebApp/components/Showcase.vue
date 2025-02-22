<template>
  <div class="h-dvh flex flex-col items-center">
    <!-- Desktop Section -->
    <div v-if="$device.isDesktop" class="flex h-dvh w-screen flex-row relative">
      <NuxtImg
        v-gsap.desktop.add.withPrevious.to="{ x: '-125%' }"
        preload
        draggable="false"
        src="/images/startPage.png"
        class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_8px_16px_20px_0vw] rounded-2xl"
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
        class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_-8px_20px_20px_0vw] rounded-2xl"
      />
    </div>

    <!-- Mobile Section -->
    <MobileShowcase v-else class="my-4" />

    <!-- Text Section -->
    <div class="flex flex-col text-center">
      <span v-if="$device.isDesktop" class="font-bold text-5xl"
        >MEV Wallet</span
      >
      <span class="text-gray-500 text-xl md:text-2xl">
        Your transactions are not just secure—They're profitable.
      </span>
    </div>
  </div>
</template>
