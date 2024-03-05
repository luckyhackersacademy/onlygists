import { z } from 'zod'
import type { ZodFormattedError } from 'zod'
import type { Gist, Headline, Code, GistVirtual } from '@/modules/gists/entities/Gist/Gist'

const schema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'Uma boa documentação é obrigatória'),
  price: z.number(),
  content: z.string().min(2, 'O código é obrigatório'),
  lang: z.string().optional(),
})

interface UseGistUpdateOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistUpdate({ gist }: UseGistUpdateOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>()
  const errors = ref<ZodFormattedError<Gist>>()

  const headline = ref<Headline>({
    title: '',
    description: '',
    price: 0,
  })

  const code = ref<Code>({
    content: '',
    lang: 'typescript',
  })

  const safeParse = () => {
    const result = schema.safeParse({ ...headline.value, ...code.value })
    if (!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const update = async () => {
    if (!gist.value) {
      return
    }

    loading.value = true

    try {
      const response = await services.gists.update(gist.value.id, {
        title: headline.value.title,
        description: headline.value.description,
        price: headline.value.price,
        content: code.value.content,
        lang: code.value.lang,
      })

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Gist atualizado!',
        life: 2000,
      })

      return response
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

    headline.value = {
      title: gist.value.title,
      description: gist.value.description,
      price: gist.value.price,
    }

    code.value = {
      content: gist.value.content,
      lang: gist.value.lang,
    }
  })

  return {
    errors,
    loading,
    headline,
    code,
    safeParse,
    update,
  }
}
