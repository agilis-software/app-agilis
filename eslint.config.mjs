import antfu from '@antfu/eslint-config'

export default antfu({
  files: ['**/*.ts'],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/component-tags-order': [
      'error',
      {
        order: [
          'script',
          'template',
          'style',
        ],
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'TWO_WAY_BINDING',
          'CONTENT',
          'RENDER_MODIFIERS',
          'ATTR_DYNAMIC',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'OTHER_DIRECTIVES',
          'EVENTS',
        ],
        alphabetical: false,
      },
    ],
    'vue/no-reserved-component-names': 0,
    'vue/no-mutating-props': 1,
    'vue/valid-v-bind': 0,
    'curly': 0,
    'no-console': 'warn',
  },
})
