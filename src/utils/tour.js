export const STORY_END = 0.8

export function tourState(progress, chapters) {
  const position = Math.max(0, Math.min(1, progress))
  const story = Math.min(position / STORY_END, 1)
  const chapter = story * (chapters - 1)
  const index = Math.round(chapter)
  const distance = Math.abs(chapter - index)
  const fade = Math.max(0, Math.min(1, (distance - 0.22) / 0.28))
  const outro = Math.max(0, (position - STORY_END) / (1 - STORY_END))
  return {
    story,
    chapter,
    index,
    opacity:
      (1 - fade * fade * (3 - 2 * fade)) * (1 - Math.min(1, outro / 0.55)),
    outro,
  }
}
