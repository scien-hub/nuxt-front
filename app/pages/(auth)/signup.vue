<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"

const { isLoggedIn, session } = useAuth()

watchEffect(() => {
    if (isLoggedIn.value && session.value?.username) {
        console.log("Redirecting to dashboard")
        navigateTo(`/${session.value.username}`)
    }
})

const errMsg = ref("")
const toast = useToast()

const fields = [
    {
        name: "email",
        type: "text" as const,
        label: "Email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password" as const,
        placeholder: "Enter your password",
    },
    {
        name: "remember",
        label: "Remember me",
        type: "checkbox" as const,
    },
]

const providers = [
    {
        label: "Google",
        icon: "i-simple-icons-google",
        onClick: () => {
            toast.add({
                title: "Google",
                description: "Login with Google",
            })
        },
    },
    {
        label: "GitHub",
        icon: "i-simple-icons-github",
        onClick: () => {
            toast.add({
                title: "GitHub",
                description: "Login with GitHub",
            })
        },
    },
]

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log("Submitted", payload)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :providers="providers"
                title="Create an account"
                icon="icons:quill"
                @submit="onSubmit"
            >
                <template #description>
                    Already have an account?
                    <ULink to="/login" class="text-primary font-medium">
Sign in
</ULink>to continue.
                </template>
                <!-- <template #password-hint>
                    <ULink
                        to="#"
                        class="text-primary font-medium"
                        tabindex="-1"
                    >
                        Forgot password?
                    </ULink>
                </template> -->
                <template #validation>
                    <UAlert v-if="errMsg" color="error" icon="i-lucide-info" :title="errMsg" />
                </template>
                <template #footer>
                    By signing in, you agree to our
                    <ULink to="/legal/terms" class="text-primary font-medium">
Terms of Service
</ULink>.
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
