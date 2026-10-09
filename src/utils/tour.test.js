import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STORY_END, tourState } from './tour.js'

test('each reading stop reaches its matching camera and shape chapter', () => {
  for (const chapters of [3, 5, 7]) {
    for (let index = 0; index < chapters; index++) {
      const state = tourState((index / (chapters - 1)) * STORY_END, chapters)
      assert.equal(state.index, index)
      assert.ok(Math.abs(state.chapter - index) < 1e-10)
      assert.equal(state.opacity, 1)
      assert.equal(state.outro, 0)
    }
  }
})

test('text clears between chapters so two headings never overlap', () => {
  const state = tourState(0.1, 5)
  assert.equal(state.chapter, 0.5)
  assert.equal(state.opacity, 0)
})

test('the final fifth moves out of the story and fades its last heading', () => {
  const state = tourState(1, 5)
  assert.equal(state.story, 1)
  assert.equal(state.index, 4)
  assert.equal(state.outro, 1)
  assert.equal(state.opacity, 0)
})

test('reverse scrolling restores the same chapter and text', () => {
  const before = tourState(0.4, 5)
  tourState(1, 5)
  assert.deepEqual(tourState(0.4, 5), before)
  assert.deepEqual(tourState(-1, 5), tourState(0, 5))
  assert.deepEqual(tourState(2, 5), tourState(1, 5))
})
