import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'

interface UseGistOptions {
  id: string
}

export function useGist({ id }: UseGistOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref<boolean>()
  const gist = ref<GistVirtual>()

  const fetchGistById = async () => {
    loading.value = true

    try {
      const [gistReadOne, gistReadOneContent] = await Promise.all([
        services.gists.readOne(id),
        services.gists.readOneContent(id),
      ])

      if (gistReadOne) {
        gist.value = gistReadOne
      }

      if (gist.value && gistReadOneContent) {
        gist.value.content = gistReadOneContent.content
      }
    } catch (e) {
      logAndTrack(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchGistById()
  })

  return {
    gist,
    loading,
  }
}
