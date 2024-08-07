const pluginSecurity = require('eslint-plugin-security');
const nodePlugin = require('eslint-plugin-n');
const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    pluginSecurity.configs.recommended,
    nodePlugin.configs['flat/recommended-script'],
    {
        files: ['**/*.js'],
        plugins: {
            security: pluginSecurity,
        },
        rules: {
            'n/exports-style': ['error', 'module.exports'],
        },
    },
    {
        ignores: ['**/*.test.js', '**/*.config.js'],
    },
];
