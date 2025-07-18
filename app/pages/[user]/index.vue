<!--
页面逻辑：
1. 用户访问之后先获取 /user/profile/ 接口，获取用户信息
2. 如果该接口返回错误，则直接报错跳转404。
文档（https://nuxt.com/docs/guide/directory-structure/error）
讲了如何处理错误，这部分没细看。

3. 如果接口返回正常，则判断是否是“登录用户访问自己的页面”
4. 如果是，则显示“Dashboard”组件
5. 如果不是，则显示“Profile”组件
-->
<script setup lang="ts">
import Dashboard from "./dashboard.vue"
import Profile from "./profile.vue"

const { isLoggedIn, session } = useAuth()
const route = useRoute()
const user = route.params.user as string

const isSelf = computed(() => {
    return isLoggedIn.value && session.value?.username === user
})

definePageMeta({
    hideFooter: true,
})
</script>

<template>
    <component :is="isSelf ? Dashboard : Profile" />
</template>
