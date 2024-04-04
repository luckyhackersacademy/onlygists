<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '@/modules/users/components/PublicHeadline/Empty.vue'
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import { useGistsReport } from '@/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '@/modules/gists/composables/useGistList/useGistList'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  const username = route.params.username as string
  return services.users.readOneByUsername(username)
})

const { gists, loading, fetchMoreGistsByUsername } = useGistList({
  username: route.params.username as string,
})

const {
  loading: reportLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
} = useGistsReport({
  user,
  isMyself: false,
})

const { arrivedState } = useScroll(window, {
  offset: { bottom: 100 },
})

watch(
  () => arrivedState.bottom,
  () => {
    if (!arrivedState.bottom) {
      return
    }

    fetchMoreGistsByUsername()
  },
)

const handleNavigateToDetail = (id: string) => {
  const { username } = route.params
  router.push(`/${username}/gist/${id}`)
}

defineOgImage({
  component: 'PublicProfile',
  props: {
    avatarUrl: user.value?.avatarUrl,
    author: user.value?.name,
    bio: user.value?.bio,
  },
})

useSeoMeta({
  title: `${user.value?.name} - @${user.value?.username}`,
  ogTitle: `${user.value?.name} - @${user.value?.username}`,
  description: `Veja os gists de ${user.value?.name} no onlygists`,
  ogDescription: `Veja os gists de ${user.value?.name} no onlygists`,
})
</script>

<template>
  <PublicHeadline
    v-if="user"
    :avatar-url="user.avatarUrl"
    :name="user.name"
    :bio="user.bio"
    :city="user.address?.city"
    :state="user.address?.state"
    class="my-10"
  />
  <PublicHeadlineEmpty v-else />

  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportLoading" :amount="3">
      <WidgetCondensed :value="totalGists" label="Gists do total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" v-if="gists.length !== 0">
    <GistCardGroup>
      <GistCardGroupLoader :loading="loading">
        <GistCardItem
          @tap="handleNavigateToDetail"
          v-for="gist in gists"
          :key="gist.id"
          :id="gist.id"
          :title="gist.title"
          :description="gist.description"
          :price="gist.price"
          :lang="gist.lang"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
