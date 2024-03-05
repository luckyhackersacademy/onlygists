import { marked } from 'marked'

export function useMarkdown() {
  const render = (text: string) => {
    return marked.parse(text)
  }

  return { render }
}
