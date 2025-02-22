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
</script>

<template>
  <ULandingCard
    title="Join MetaPro Now!"
    description="Sign up for our newsletter and join the growing MetaPro community."
    icon="i-heroicons-envelope"
  >
    <UForm :schema="schema" :state="state" class="space-y-2" @submit="onSubmit">
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
</template>
