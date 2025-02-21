<template>
  <ULandingSection>
    <template #headline>
      <div class="font-thin text-gray-500 text-1xl sm:text-3xl">
        The crypto wallet that
        <UIcon name="i-fa6-solid-recycle" />
        earnings
      </div>
    </template>

    <template #title>
      <div class="font-thin md:font-black text-primary text-4xl md:text-9xl">
        Meta<span class="text-black">, but this time</span>
      </div>
      <div class="font-thin md:font-black text-primary text-4xl md:text-9xl">
        <span class="text-black">for </span>Pros
      </div>
    </template>

    <template #description>
      <div class="p-8 space-y-2">
        <UButton
          block
          variant="soft"
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
        >
          <template #leading>
            <NuxtImg
              v-gsap.dektop.whileHover.noReverse.to="{
                rotate: 360,
              }"
              src="./chrome.svg"
            />
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
