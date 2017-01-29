var fs = require('fs');
var assert = require('assert');

function addTrailingSlash(path) {
  return path.substr(-1) == '/' ? path : path + '/';
}

/**
* Pass `manifestpath` and `opts` to return
* a assetPath function.
*
* - `env` the current environment [process.env.NODE_ENV || 'development']
* - `localPath` path to use when in development [/]
* - `cdnUrl` url to use when in production []
*
* @param {String} [manifestPath]
* @param {Object} [opts]
* @return {Function}
* @api public
*/

module.exports = function (manifestPath, opts) {
  assert(manifestPath, 'You must pass a path to your manifest JSON file');

  opts = opts || {};
  opts.localPath = addTrailingSlash(opts.localPath || '/');
  opts.cdnUrl = opts.cdnUrl ? addTrailingSlash(opts.cdnUrl) : null;

  opts.env = opts.env || process.env.NODE_ENV || 'development';

  var manifest;

  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } else {
    manifest = {};
  }

  var base;
  if (opts.env === 'development') {
    base = opts.localPath;
  } else {
    base = opts.cdnUrl || opts.localPath;
  }

  return function(filename) {
    return base + (manifest[filename] || filename);
  };
};
