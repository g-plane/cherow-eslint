# cherow-eslint

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

## Reporting Bugs

You should provide these information for reproduction:

- ESLint version
- `cherow-eslint` version
- Your ESLint configuration
- Your code and the error output

## License

MIT Licensed

Copyright © 2018-present [Pig Fang](https://gplane.win/)
