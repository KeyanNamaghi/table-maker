const prettierconfig = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  printWidth: 120,
  proseWrap: 'preserve',
  requirePragma: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 500,
      },
    },
  ],
}

module.exports = prettierconfig
