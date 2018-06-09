const cherow = require('cherow')
const { getTokens } = require('./tokens')

function convertRanges(node) {
  if (typeof node.start === 'number' && typeof node.end === 'number') {
    node.range = [node.start, node.end]
  }
  for (const key in node) {
    if (key !== 'loc' && typeof node[key] === 'object' && node[key] !== null) {
      convertRanges(node[key])
    }
  }
}

function convertComments(comments) {
  comments.forEach(comment => {
    if (comment.type === 'SingleLine') {
      comment.type = 'Line'
    } else if (comment.type === 'MultiLine') {
      comment.type = 'Block'
    }
  })
}

function parse(code, parserOptions = {}) {
  const ecmaFeatures = parserOptions.ecmaFeatures || {}

  const ast = cherow.parse(code, {
    raw: true,
    loc: true,
    ranges: true,
    comments: true,
    skipShebang: true,
    module: parserOptions.sourceType === 'module',
    globalReturn: ecmaFeatures.globalReturn,
    impliedStrict: ecmaFeatures.impliedStrict,
    jsx: ecmaFeatures.jsx
  })

  convertRanges(ast)
  convertComments(ast.comments)
  ast.tokens = getTokens(code, parserOptions)

  return ast
}

module.exports = {
  parse
}
