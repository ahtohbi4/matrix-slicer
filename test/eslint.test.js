'use strict';

const lint = require('mocha-eslint');

const paths = [
    '*.js',
    'test/*.js'
];

lint(paths);
