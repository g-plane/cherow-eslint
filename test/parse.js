import test from 'ava'
import parser from '../lib'

test('when strict mode error occurs', t => {
  const error = t.throws(
    () => parser.parse('function fn(a, a) {\n}', { sourceType: 'module' }),
    SyntaxError
  )
  t.is(error.line, 2)
  t.is(error.column, 0)
  t.is(error.index, 21)
})

test('throw an error when using the `y` regex flag', t => {
  t.throws(() => parser.parse('/./y'))
})

test('throw an error when using the `u` regex flag', t => {
  t.throws(() => parser.parse('/./u'))
})

test('reset lastToken on each parse', t => {
  parser.parse('var foo = bar;')
  const ast = parser.parse('//foo')

  t.deepEqual(ast.range, [0, 5])
  t.deepEqual([ast.loc.start.line, ast.loc.start.column], [1, 0])
  t.deepEqual([ast.loc.end.line, ast.loc.end.column], [1, 5])
})

test('should not mutate config', t => {
  parser.parse('foo', Object.freeze({ ecmaFeatures: Object.freeze({}) }))
  t.pass()
})
