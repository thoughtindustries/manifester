var fs = require('fs');
var assert = require('assert');

function addTrailingSlash(path) {
  return path.substr(-1) == '/' ? path : path + '/';
}

module.exports = function (manifestPath, opts) {
  assert(manifestPath, 'You must pass a path to your manifest JSON file');

  opts = opts || {};
  opts.localPath = addTrailingSlash(opts.localPath || '/');
  opts.cdnUrl = opts.cdnUrl ? addTrailingSlash(opts.cdnUrl) : null;

  opts.env = opts.env || process.env.NODE_ENV || 'development';

  var manifest = fs.readFileSync(manifestPath, 'utf8');

  manifest = JSON.parse(manifest);

  return function(filename) {
    if (manifest[filename] && opts.env != 'development') {
      return (opts.cdnUrl || opts.localPath) + manifest[filename];
    } else {
      return opts.localPath + filename;
    }
  };
};
