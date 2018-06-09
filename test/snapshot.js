import test from 'ava'
import parser from '../lib'

test('normal code', t => {
  t.snapshot(parser.parse('const a = 5'))
})

test('latest ES features', t => {
  t.snapshot(parser.parse('const obj = { ...o1, ...o2 }'))
})

test('JSX', t => {
  t.snapshot(parser.parse('<div></div>', { ecmaFeatures: { jsx: true } }))
})

test('module mode', t => {
  t.snapshot(parser.parse('import m from "."', { sourceType: 'module' }))
})

test('comments', t => {
  t.snapshot(parser.parse('/* block */\n// line'))
})

test('regular expression', t => {
  t.snapshot(parser.parse('a / b'))
  t.snapshot(parser.parse('5 / 1'))
  t.snapshot(parser.parse('{ /\\.js$/.test() }'))
})
