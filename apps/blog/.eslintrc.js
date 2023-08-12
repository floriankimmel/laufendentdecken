module.exports = {
    root: true,
    extends: ['custom'],
    ignorePatterns: ['node_modules/'],
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        'no-duplicate-imports': 'error',
        'no-var': 'warn',
        'prefer-const': [ 'warn', { 'destructuring': 'all' } ],
        'no-duplicate-imports': 'off',
        'import/no-duplicates': 'error',
        'n/no-deprecated-api': 'off',
        'no-prototype-builtins': 'warn',
        'no-case-declarations': 'warn',
        'no-restricted-imports': [ 'error', { 'patterns': [ '~*' ] } ],
        'import/order': 'error',
    }
}
