<script setup lang="ts">
import { Base } from '#components';

const links = [{
  label: 'Docs',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Pro',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Releases',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]

const ui = {
  wrapper: "relative text-black",
};
</script>

<template>
  <!-- Header -->
  <UHeader :links="links" :ui="ui">
    <!-- Font size bigger -->
    <template #left>
      <text class="text-3xl font-bold">MetaPro</text>
    </template>

    <template #right>
      <UButton color="primary" variant="solid">Early Access</UButton>
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
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>

    <template #right>
      <UButton icon="i-simple-icons-x" color="gray" variant="ghost" to="https://x.com/TheMetaPro" target="_blank" />
      <UButton icon="i-simple-icons-discord" color="gray" variant="ghost" to="https://discord.gg/p9RZaBPSdF" target="_blank" />
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/Arvmor/MetaPro" target="_blank" />
    </template>
  </UFooter>
</template>
