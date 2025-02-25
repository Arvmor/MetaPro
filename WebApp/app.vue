<script setup>
useSeoMeta({
  title: "MetaPro - Ethereum Private Wallet",
  description:
    "MetaPro is a private Ethereum wallet that allows you to store your assets securely.",
  ogTitle: "Ethereum Private Wallet",
  ogDescription:
    "MetaPro is a private Ethereum wallet that allows you to store your assets securely.",
  ogImage: "/favicon-32x32.png",
  ogUrl: "https://metapro.app",
  twitterTitle: "MetaPro - Ethereum Private Wallet",
  twitterDescription:
    "MetaPro is a private Ethereum wallet that allows you to store your assets securely.",
  twitterImage: "/favicon-32x32.png",
  twitterCard: "summary_large_image",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});
</script>

<template>
  <!-- Main -->
  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>
</template>
