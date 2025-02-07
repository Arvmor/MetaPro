<script setup lang="ts">
    import { object, string, type InferType } from 'yup'
    import type { FormSubmitEvent } from '#ui/types'

    const schema = object({
        email: string().email('Invalid email').required('Required')
    })

    type Schema = InferType<typeof schema>

    const state = reactive({
        email: undefined
    })

    async function onSubmit(event: FormSubmitEvent<Schema>) {
        // Do something with event.data
        console.log(event.data)
    }
</script>


<template>
    <div>
        <ULandingSection class="h-screen w-full flex flex-col justify-center items-center ">
            <template #headline>
                <div class="text-gray-500 text-3xl">
                    <span>The crypto wallet that </span> 
                    <UIcon name="i-fa6-solid-recycle"/>
                    <span> earnings</span>
                </div>
            </template>

            <template #title>
                <div class="text-primary text-9xl">
                    <span class="text-black">Meta,</span><span> but this time</span>
                </div>
                <div class="text-primary text-9xl">
                    <span>for </span><span class="text-black">Pros</span>
                </div>
            </template>

            <template #description>
                <UButton color="primary">Join for Airdrop!</UButton>
                <div class="text-gray-400">
                    <span>By using this you agree to our <u>Terms of Service</u>.</span>
                </div>
            </template>
        </ULandingSection>
  
        <ULandingSection title="The freedom to build anything" align="left" />
        <ULandingSection title="The flexibility to control your data" align="right" />
  
    </div>
    <ULandingCard
        title="Newsletter"
        description="Sign up for our newsletter and join the growing MetaPro community."
        icon="i-heroicons-photo"
        color="primary"
        class="m-8"
    >
        <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-2">
            <UFormGroup label="Email" name="email">
                <UInput placeholder="you@example.com" icon="i-heroicons-envelope" v-model="state.email" />
            </UFormGroup>

            <UButton type="submit">Sign Up</UButton>
        </UForm>
    </ULandingCard>
</template>

  