# Manifester

A fingerprint manifest reader.

Reads a JSON manifest (generated by e.g. [https://github.com/sindresorhus/gulp-rev/](https://github.com/sindresorhus/gulp-rev/)) and returns a function you can use in your views to reference the fingerprinted file path while in development and production.

## Installation

```
$ npm install manifester
```

## Example

```js
var assetPath = require('manifester')('./path/to/manifest.json', {localPath: '/assets'});

assetPath('test.js') // => '/assets/test.js'

var prodAssetPath = require('manifester')('./path/to/manifest.json', {cdnUrl: 'https://d3.cloudfront.net/assets', env: 'production'});

prodAssetPath('test.js') // => 'https://d3.cloudfront.net/assets/test-c27904c624.js'
```

## Usage

```js
var assetPath = require('manifester')('./path/to/manifest.json', {
  env: 'string', // defaults to process.env.NODE_ENV and falls back to 'development'
  localPath: 'string', // defaults to /, used only in development
  cdnUrl: 'string' // no default. falls back to localPath if not provided.
});
```

# License

  MIT
