<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  email: string().email("Invalid email").required("Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

const items = [
  {
    label: "Do you have a free trial?",
    content:
      "Ea est ex aliqua exercitation quis et cillum adipisicing sit tempor veniam incididunt labore.",
  },
  {
    label: "Can I use Nuxt UI Pro for Open Source projects?",
    content:
      "Et adipisicing do do do sunt irure proident consequat fugiat tempor occaecat commodo fugiat in proident.",
  },
  {
    label: "What does “Unlimited minor & patch updates” include?",
    content:
      "Dolor dolor consectetur tempor consectetur sint ut id ex quis voluptate dolore incididunt qui mollit.",
  },
  {
    label: "Do you offer technical support?",
    content: "Sint id sint incididunt culpa.",
  },
];
</script>

<template>
  <div v-gsap.desktop.timeline.pinned="{ start: 'top top' }">
    <div>
      <ULandingSection
        v-gsap.desktop.add.to="{ opacity: 0, scale: 0.8 }"
        class="md:h-screen flex flex-col justify-center items-center"
      >
        <template #headline>
          <div class="font-thin text-gray-500 sm:text-3xl text-1xl">
            <span>The crypto wallet that </span>
            <UIcon name="i-fa6-solid-recycle" />
            <span> earnings</span>
          </div>
        </template>

        <template #title>
          <div
            class="font-thin md:font-black text-primary text-4xl md:text-9xl"
          >
            <span>Meta</span><span class="text-black">, but this time</span>
          </div>
          <div
            class="font-thin md:font-black text-primary text-4xl md:text-9xl"
          >
            <span class="text-black">for </span><span>Pros</span>
          </div>
        </template>

        <template #description>
          <div class="p-16 space-y-2">
            <UButton
              block
              color="primary"
              size="xl"
              :ui="{ rounded: 'rounded-full' }"
              >Join for Airdrop</UButton
            >
            <div
              class="font-thin text-gray-400 text-sm flex flex-col items-center"
            >
              <span>By using this you agree to our</span>
              <u>Terms of Service</u>
            </div>
          </div>
        </template>
      </ULandingSection>
    </div>

    <!-- Image Section -->
    <div
      v-gsap.desktop.add.withPrevious.to="{ y: '-100vh' }"
      class="p-8 h-screen flex flex-col items-center"
    >
      <div
        v-gsap.desktop.add.withPrevious.to="{ scale: 0.9 }"
        class="flex h-screen w-screen flex-row py-8 relative"
      >
        <NuxtImg
          v-gsap.desktop.add.withPrevious.to="{ x: '-125%' }"
          preload
          provider="imagekit"
          :modifiers="{ radius: 30 }"
          src="./startPage.png"
          class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_8px_16px_20px_0vw] hidden sm:block"
        />
        <NuxtImg
          preload
          provider="imagekit"
          :modifiers="{ radius: 30 }"
          src="./mainWallet.png"
          class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[0px_16px_20px_0vw_rgba(0,0,0,0.3)]"
        />
        <NuxtImg
          v-gsap.desktop.add.withPrevious.to="{ x: '125%' }"
          preload
          provider="imagekit"
          :modifiers="{ radius: 30 }"
          src="./lockPage.png"
          class="absolute left-1/2 -translate-x-1/2 rounded-[20px] shadow-[rgba(0,0,0,0.3)_-8px_20px_20px_0vw] hidden sm:block"
        />
      </div>

      <div class="flex flex-col text-center space-y-2">
        <span class="text-5xl hidden sm:block font-bold"> MEV Wallet </span>
        <span class="text-gray-500 text-xl md:text-2xl">
          Your transactions are not just secure—They're profitable.
        </span>
      </div>
    </div>

    <div class="px-8">
      <ULandingFAQ :items="items" />
    </div>

    <!-- Newsletter -->
    <ULandingCard
      title="Newsletter"
      description="Sign up for our newsletter and join the growing MetaPro community."
      icon="i-heroicons-photo"
      color="primary"
      class="mx-8"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-2"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="state.email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UButton type="submit">Sign Up</UButton>
      </UForm>
    </ULandingCard>
  </div>
</template>
