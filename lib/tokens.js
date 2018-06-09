const cherow = require('cherow')

/* eslint-disable curly */
function convertTokenType(id) {
  const type = id & 0xff // eslint-disable-line no-bitwise
  if (type === 1) return 'Identifier'
  else if (type === 2) return 'Numeric'
  else if (type === 3) return 'String'
  else if (type === 4) return 'RegularExpression'
  else if (type === 5 || type === 6) return 'Boolean'
  else if (type === 7) return 'Null'
  else if (type === 8 || type === 9) return 'Template'
  else if (type >= 10 && type <= 41) return 'Punctuator'
  else if (type >= 42 && type <= 44) return 'Keyword'
  else if (type >= 45 && type <= 48) return 'Punctuator'
  else if (type === 49 || type === 50) return 'Keyword'
  else if (type >= 51 && type <= 70) return 'Punctuator'
  else if (type >= 71 && type <= 114) return 'Keyword'
  else if (type === 115) return 'Punctuator'
  else if (type >= 116 && type <= 118) return 'Keyword'
  else if (type === 119) return 'Identifier'
  else if (type === 120) return 'Punctuator'
  else if (type === 121) return 'JSXText'
  else if (type === 0) return '<end>'
}
/* eslint-enable curly */

function getTokens(code) {
  const parser = cherow.Parser.createParser(code)
  const tokens = []
  let token

  while ((token = cherow.Scanner.scan(parser, 0))) {
    // End of source
    if (token === 1048576) {
      break
    }

    // This is the token '/'
    if (token === 167774773) {
      const last = tokens[tokens.length - 1]
      if (last.type !== 'Numeric' && last.type !== 'Identifier') {
        token = cherow.Scanner.scanRegularExpression(parser, 0)
      }
    }

    const tokenType = convertTokenType(token)
    tokens.push({
      type: tokenType,
      range: [parser.startIndex, parser.index],
      loc: {
        start: { line: parser.startLine, column: parser.startColumn },
        end: { line: parser.line, column: parser.column }
      },
      value: tokenType === 'Punctuator'
        ? cherow.tokenDesc(token)
        : parser.tokenValue.toString(),
      regex: tokenType === 'RegularExpression' ? parser.tokenValue : undefined
    })
  }

  return tokens
}

module.exports = {
  getTokens
}
