module.exports = {
  extends: [
    'stylelint-config-standard-scss',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    // Règles de base (seulement celles qui fonctionnent)
    'color-named': 'never',
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'function-url-quotes': 'always',
    'font-weight-notation': 'numeric',
    'font-family-name-quotes': 'always-where-required',
    'comment-whitespace-inside': 'always',
    'rule-empty-line-before': 'always-multi-line',
    'selector-pseudo-element-colon-notation': 'double',

    // Règles personnalisées pour rem-calc avec messages plus clairs
    'declaration-property-value-allowed-list': {
      // Dimensions - DOIT utiliser rem-calc
      'width': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^100%$/, /^inherit$/],
      'height': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^100%$/, /^inherit$/],
      'min-width': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^100%$/, /^inherit$/],
      'max-width': [/^rem-calc\([^)]+\)$/, /^none$/, /^100%$/, /^inherit$/],
      'min-height': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^100%$/, /^inherit$/],
      'max-height': [/^rem-calc\([^)]+\)$/, /^none$/, /^100%$/, /^inherit$/],

      // Marges - DOIT utiliser rem-calc
      'margin': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^inherit$/],
      'margin-top': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^inherit$/],
      'margin-right': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^inherit$/],
      'margin-bottom': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^inherit$/],
      'margin-left': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^inherit$/],

      // Padding - DOIT utiliser rem-calc
      'padding': [/^rem-calc\([^)]+\)$/, /^0$/, /^inherit$/],
      'padding-top': [/^rem-calc\([^)]+\)$/, /^0$/, /^inherit$/],
      'padding-right': [/^rem-calc\([^)]+\)$/, /^0$/, /^inherit$/],
      'padding-bottom': [/^rem-calc\([^)]+\)$/, /^0$/, /^inherit$/],
      'padding-left': [/^rem-calc\([^)]+\)$/, /^0$/, /^inherit$/],

      // Position - DOIT utiliser rem-calc
      'top': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^50%$/, /^100%$/, /^inherit$/],
      'right': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^50%$/, /^100%$/, /^inherit$/],
      'bottom': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^50%$/, /^100%$/, /^inherit$/],
      'left': [/^rem-calc\([^)]+\)$/, /^0$/, /^auto$/, /^50%$/, /^100%$/, /^inherit$/],

      // Typographie - DOIT utiliser rem-calc
      'font-size': [/^rem-calc\([^)]+\)$/, /^inherit$/, /^smaller$/, /^larger$/],
      'line-height': [/^rem-calc\([^)]+\)$/, /^normal$/, /^inherit$/, /^\d+(\.\d+)?$/],

      // Grid - DOIT utiliser rem-calc
      'gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
      'row-gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
      'column-gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
      'grid-gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
      'grid-row-gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
      'grid-column-gap': [/^rem-calc\([^)]+\)$/, /^0$/, /^normal$/],
    },

    // Règles SCSS spécifiques (seulement celles qui fonctionnent)
    'scss/at-rule-no-unknown': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/comment-no-empty': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dollar-variable-default': [true, { ignore: 'local' }],
    'scss/dollar-variable-no-namespaced-assignment': true,
    'scss/dollar-variable-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/function-color-relative': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/map-keys-quotes': 'always',
    'scss/no-global-function-names': true,
    'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/selector-nest-combinators': 'always',
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
  ],
};
