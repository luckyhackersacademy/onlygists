<script setup lang="ts">
import type { Code } from '@/modules/gists/entities/Gist/Gist'
import type { Gist } from '@/modules/gists/entities/Gist/Gist'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  errors?: ZodFormattedError<Gist>
}>()

const DEFAULT_CODE = `
interface User {
  name: string
  roles: string[]
}

function main(): User {
  return { name: 'Igor', roles: ['admin'] }
}

const user = main()
console.log(user)
`

const code = defineModel<Code>({
  required: true,
  default: {
    content: DEFAULT_CODE,
    lang: 'typescript',
  },
})

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  padding: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  fontSize: 15,
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full h-[500px]">
    <label for="editor">Escreva o código</label>
    <VueMonacoEditor
      id="editor"
      v-model:value="code.content"
      theme="vs"
      :options="MONACO_EDITOR_OPTIONS"
      class="border-2 border-solid border-gray-100"
      :default-language="code.lang"
      :language="code.lang"
    />
    <small v-if="props.errors?.content">{{ props.errors?.content._errors[0] }}</small>
  </div>
</template>
