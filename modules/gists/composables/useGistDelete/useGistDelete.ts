import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'

interface UseGistDeleteOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistDelete({ gist }: UseGistDeleteOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>(false)
  const gistId = ref<string>()

  const remove = async () => {
    if (!gistId.value) {
      return
    }

    loading.value = true

    try {
      await services.gists.delete(gistId.value)

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Gist apagado!',
        life: 2000,
      })
    } catch (e) {
      logAndTrack(e)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value) {
      return
    }

    gistId.value = gist.value.id
  })

  return {
    loading,
    remove,
  }
}
