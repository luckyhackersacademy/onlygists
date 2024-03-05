<script setup lang="ts">
const router = useRouter()

const navigateToPanel = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2_000))
  router.push('/app/panel')
}

onMounted(() => {
  navigateToPanel()
})
</script>

<template>
  <MainContent #content>
    <p class="font-[Inter] text-gray-800 text-regular">🤩 Redirecionando...</p>
  </MainContent>
</template>
