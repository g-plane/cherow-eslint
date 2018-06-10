import test from 'ava'
import parser from '../lib'

test('token divide', t => {
  let { tokens } = parser.parse('var a = b / 1')
  t.true(
    tokens.some(token => token.type === 'Punctuator' && token.value === '/')
  )
  t.false(tokens.some(token => token.type === 'RegularExpression'))

  void ({ tokens } = parser.parse('var a = 2 / 1'))
  t.true(
    tokens.some(token => token.type === 'Punctuator' && token.value === '/')
  )
  t.false(tokens.some(token => token.type === 'RegularExpression'))
})

test('regular expression', t => {
  const { tokens } = parser.parse('var a = /\\.js$/')
  t.false(
    tokens.some(token => token.type === 'Punctuator' && token.value === '/')
  )
  t.true(tokens.some(token => token.type === 'RegularExpression'))
})

test('JSX closing token', t => {
  const { tokens } = parser.parse(
    '<div></div>',
    { ecmaFeatures: { jsx: true } }
  )
  t.is(tokens[3].type, 'Punctuator')
  t.is(tokens[3].value, '<')
  t.is(tokens[4].type, 'Punctuator')
  t.is(tokens[4].value, '/')
})
