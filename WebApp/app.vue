<script setup lang="ts">
const links = [
  {
    label: "Discord",
    icon: "i-simple-icons-discord",
    to: "https://discord.gg/p9RZaBPSdF",
  },
  {
    label: "Twitter",
    icon: "i-simple-icons-x",
    to: "https://x.com/theMetaPro",
  },
  {
    label: "Docs",
    icon: "i-heroicons-book-open",
    to: "https://docs.metapro.app",
  },
];
</script>

<template>
  <!-- Header -->
  <UHeader
    :ui="{
      wrapper: 'relative border-none',
      container: 'md:max-w-full md:mx-4 lg:mx-4 md:px-0 lg:px-0',
    }"
  >
    <template #logo>
      <text class="text-3xl font-bold">MetaPro</text>
      <UBadge color="primary" variant="subtle" label="v0.6" />
      <UHeaderLinks :links="links" class="ml-4 items-start hidden lg:flex" />
    </template>

    <template #right>
      <UButton
        color="primary"
        variant="solid"
        :ui="{ rounded: 'rounded-full' }"
        size="lg"
        >Early Access</UButton
      >
    </template>
  </UHeader>

  <!-- Main -->
  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <!-- Footer -->
  <UFooter :links="links">
    <template #left> Copyright © {{ new Date().getFullYear() }} </template>

    <template #right>
      <UButton
        icon="i-simple-icons-x"
        color="gray"
        variant="ghost"
        to="https://x.com/TheMetaPro"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-discord"
        color="gray"
        variant="ghost"
        to="https://discord.gg/p9RZaBPSdF"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
        to="https://github.com/Arvmor/MetaPro"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
