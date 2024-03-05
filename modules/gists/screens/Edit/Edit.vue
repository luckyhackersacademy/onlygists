<script setup lang="ts">
import HeadlineEdit from '@/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'
import { useGist } from '@/modules/gists/composables/useGist/useGist'
import { useGistUpdate } from '@/modules/gists/composables/useGistUpdate/useGistUpdate'
import { useGistDelete } from '@/modules/gists/composables/useGistDelete/useGistDelete'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'

const route = useRoute()
const router = useRouter()
const confirm = useConfirm()
const { user } = inject(myselfKey) as MyselfContextProvider

const { gist } = useGist({
  id: route.params.id as string,
})

const { loading, errors, headline, code, safeParse, update } = useGistUpdate({
  gist,
})

const { loading: loadingDelete, remove } = useGistDelete({
  gist,
})

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}

const handleDeleteGist = () => {
  confirm.require({
    header: 'Apagar gist?',
    message: 'Tem certeza que deseja apagar esse gist?',
    rejectLabel: 'Voltar',
    acceptLabel: 'Quero apagar!',
    accept: async () => {
      await remove()
      router.push(`/${user.value.username}`)
    },
  })
}

const handleUpdateGist = async () => {
  const isValid = safeParse().success
  if (!isValid) {
    return
  }

  const response = await update()
  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}
</script>

<template>
  <ConfirmDialog />

  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <div class="flex gap-2">
    <Button
      @click="handleUpdateGist"
      :loading="loading"
      class="mt-5 w-full md:w-auto"
      label="Criar"
      icon="pi pi-plus"
      icon-pos="right"
    />
    <Button
      @click="handleDeleteGist"
      :loading="loadingDelete"
      class="mt-5 w-full md:w-auto"
      label="Delete"
      severity="danger"
    />
  </div>
</template>
