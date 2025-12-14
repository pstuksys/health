// Utilities for working with Lexical editor state objects

export function hasNonEmptyLexicalContent(state: unknown): boolean {
  try {
    const obj = typeof state === 'string' ? JSON.parse(state) : (state as Record<string, unknown>)
    const root = obj && typeof obj === 'object' ? (obj as { root?: { children?: unknown[] } }).root : undefined
    if (!root || !Array.isArray(root.children)) return false

    function extractText(node: unknown): string {
      if (!node || typeof node !== 'object') return ''
      const n = node as { text?: unknown; children?: unknown[] }
      const text = typeof n.text === 'string' ? n.text : ''
      const childrenText = Array.isArray(n.children) ? n.children.map(extractText).join('') : ''
      return `${text}${childrenText}`
    }

    const text = root.children.map(extractText).join('').trim()
    return text.length > 0
  } catch {
    return false
  }
}
