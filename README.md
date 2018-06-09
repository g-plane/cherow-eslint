# cherow-eslint

[![Travis](https://img.shields.io/travis/cherow/cherow-eslint.svg?style=flat-square)](travis-ci.org/cherow/cherow-eslint)
[![NPM Version](https://img.shields.io/npm/v/cherow-eslint.svg?style=flat-square)](npmjs.com/package/cherow-eslint)
[![NPM Downloads](https://img.shields.io/npm/dm/cherow-eslint.svg?style=flat-square)](npmjs.com/package/cherow-eslint)

[Cherow](https://github.com/cherow/cherow) parser for ESLint.

**This package is still experimental.**

## Installation

Using Yarn:

```bash
yarn add --dev cherow-eslint
```

Using npm:

```bash
npm i --save-dev cherow-eslint
```

## Usage

Modify your ESLint configuration file:

```json
{
  "parser": "cherow-eslint"
}
```

Note that if you are using `vue-eslint-parser`,
you should update your configuration file like this:

```json
{
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "cherow-eslint"
  }
}
```

## Known Issues

Cherow doesn't provide official tokenizer,
so there are some problems with tokenizing:

- An error will be thrown when parsing string template with expressions,
like this:

```javascript
const s = `value: ${1 + 2}`
```

- The tokenizer cannot detect an identifier as `JSXIdentifier` in JSX.
That is, the `JSXIdentifier` token will be treated as normal `Identifier`.

## Reporting Bugs

You should provide these information for reproduction:

- ESLint version
- `cherow-eslint` version
- Your ESLint configuration
- Your code and the error output

## License

MIT Licensed

Copyright © 2018-present [Pig Fang](https://gplane.win/)
