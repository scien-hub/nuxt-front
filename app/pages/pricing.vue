<script setup lang="ts">
const page = ref({
    title: "A Plan for Every Need",
    description:
        "Our plans are designed to meet the requirements of both beginners and players. Get the right plan that suits you.",
    seo: {
        title: "Pricing",
        description: "Choose the plan that's right for you.",
    },
    plans: [
        {
            title: "Basic",
            description: "A basic plan for individuals.",
            price: {
                month: "$9.9",
                year: "$99.9",
            },
            button: {
                label: "Get Started",
                color: "neutral",
                variant: "subtle",
            } as const,
            features: [
                "1 GB Storage",
                "1 Email Account",
                "1 Domain",
                "1 Website",
                "1 Database",
                "1 SSL Certificate",
                "1 Support Ticket",
            ],
        },
        {
            title: "Standard",
            description: "A standard plan for small teams.",
            price: {
                month: "$19.9",
                year: "$199.9",
            },
            highlight: true,
            scale: true,
            button: {
                label: "Get Started",
            },
            features: [
                "10 GB Storage",
                "10 Email Accounts",
                "10 Domains",
                "10 Websites",
                "10 Databases",
                "10 SSL Certificates",
                "10 Support Tickets",
            ],
        },
        {
            title: "Premium",
            description: "A premium plan for large teams.",
            price: {
                month: "$29.9",
                year: "$299.9",
            },
            button: {
                label: "Get Started",
                color: "neutral",
                variant: "subtle",
            } as const,
            features: [
                "100 GB Storage",
                "100 Email Accounts",
                "100 Domains",
                "100 Websites",
                "100 Databases",
                "100 SSL Certificates",
                "100 Support Tickets",
            ],
        },
    ],
    logos: {
        title: "Trusted by the world's best",
        icons: [
            "i-simple-icons-amazonaws",
            "i-simple-icons-heroku",
            "i-simple-icons-netlify",
            "i-simple-icons-vercel",
            "i-simple-icons-cloudflare",
        ],
    },
    faq: {
        title: "Frequently asked questions",
        description: "Culpa consectetur dolor pariatur commodo aliqua amet tempor nisi enim deserunt elit cillum.",
        items: [
            {
                label: "Is this a secure service?",
                content:
                    "Qui sunt nostrud aliquip reprehenderit enim proident veniam magna aliquip velit occaecat eiusmod nisi deserunt sunt.",
                defaultOpen: true,
            },
            {
                label: "How can I cancel my subscription?",
                content:
                    "Consectetur irure Lorem nostrud adipisicing aliqua mollit Lorem sit officia magna eiusmod cupidatat.",
            },
            {
                label: "How does the free trial work?",
                content: "Quis officia commodo magna eu qui aliquip duis.",
            },
            {
                label: "Can I switch plans later?",
                content: "Dolore irure ullamco dolore eu occaecat magna eiusmod dolor aliqua culpa labore.",
            },
            {
                label: "Do you offer refunds?",
                content: "Duis mollit nostrud voluptate mollit Lorem dolore commodo veniam incididunt eiusmod.",
            },
            {
                label: "Do you offer support?",
                content: "Aliqua sit nisi consequat pariatur Lorem minim irure qui.",
            },
        ],
    },
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
})

const isYearly = ref("0")

const items = ref([
    {
        label: "Monthly",
        value: "0",
    },
    {
        label: "Yearly",
        value: "1",
    },
    {
        label: "Education",
        value: "2",
    },
])
</script>

<template>
    <div>
        <UPageHero :title="page.title" :description="page.description">
            <template #links>
                <UTabs
                    v-model="isYearly"
                    :items="items"
                    color="neutral"
                    class="w-72"
                    :ui="{
                        list: 'rounded-full',
                        indicator: 'rounded-full',
                    }"
                />
            </template>
        </UPageHero>

        <UContainer>
            <UPricingPlans scale>
                <UPricingPlan
                    v-for="(plan, index) in page.plans"
                    :key="index"
                    v-bind="plan"
                    :price="isYearly === '1' ? plan.price.year : plan.price.month"
                    :billing-cycle="isYearly === '1' ? '/year' : '/month'"
                />
            </UPricingPlans>
        </UContainer>

        <UPageSection :title="page.faq.title" :description="page.faq.description">
            <UPageAccordion :items="page.faq.items" multiple class="mx-auto max-w-4xl" />
        </UPageSection>
    </div>
</template>
