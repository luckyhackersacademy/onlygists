import { z } from 'zod'
import type { ZodFormattedError } from 'zod'
import type { Gist, Headline, Code } from '@/modules/gists/entities/Gist/Gist'
import type { User } from '@/modules/users/entities/User/User'

const schema = z.object({
  title: z.string().min(2, 'Título é obrigatório'),
  description: z.string().min(10, 'Uma boa documentação é obrigatória'),
  price: z.number(),
  content: z.string().min(2, 'O código é obrigatório'),
  lang: z.string().optional(),
})

interface UseGistCreateOptions {
  user: Ref<User | undefined>
}

export function useGistCreate({ user }: UseGistCreateOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()
  const loading = ref<boolean>()
  const errors = ref<ZodFormattedError<Gist>>()
  const userId = ref<string>()

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

  const create = async () => {
    if (!userId.value) {
      return
    }

    loading.value = true

    try {
      const response = await services.gists.create({
        ...headline.value,
        ...code.value,
        profileId: userId.value,
      })

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Gist criado!',
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
    if (!user.value) {
      return
    }

    userId.value = user.value.id
  })

  return {
    errors,
    loading,
    headline,
    code,
    safeParse,
    create,
  }
}
