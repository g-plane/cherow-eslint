import test from 'ava'
import parser from '../lib'

test('convert comments type', t => {
  const ast = parser.parse('//line\n/*block*/')
  t.is(ast.comments[0].type, 'Line')
  t.is(ast.comments[1].type, 'Block')
})
