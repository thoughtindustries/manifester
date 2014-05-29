var assert = require('assert');

var manifestPath = './test/manifest.json';

describe('manifester', function() {
  it('returns an error if no manifestPath was given', function() {
    assert.throws(
      function() {
        var assetPath = require('..')();
      }
    );
  });

  it('mimics the filename given when an invalid manifest is given', function() {
    var assetPath = require('..')('./made-up.json');
    assert.equal(assetPath('app.js'), '/app.js');
  });

  it('returns an error if the manifestPath given cannot be parsed', function() {
    assert.throws(
      function() {
        var assetPath = require('..')('./index.js');
      }
    );
  });

  describe('env', function() {
    it('returns an un-fingerprinted path in development', function() {
      var assetPath = require('..')(manifestPath);
      assert.equal(assetPath('app.js'), '/app.js');
    });

    it('returns a fingerprinted path in production', function() {
      var assetPath = require('..')(manifestPath, {env: 'production'});
      assert.equal(assetPath('app.js'), '/app-c27904c624.js');
    });
  });

  describe('localPath', function() {
    it('defaults to /', function() {
      var assetPath = require('..')(manifestPath);
      assert.equal(assetPath('app.js').substr(0, 1), '/');
    });

    it('is used if provided', function() {
      var assetPath = require('..')(manifestPath, {localPath: '/assets'});
      assert.equal(assetPath('app.js'), '/assets/app.js');
    });
  });

  describe('cdnUrl', function() {
    it('is used if provided', function() {
      var assetPath = require('..')(manifestPath, {env: 'production', cdnUrl: 'https://d3.cloudfront.net'});
      assert.equal(assetPath('app.js'), 'https://d3.cloudfront.net/app-c27904c624.js');
    });

    it('is not used in development', function() {
      var assetPath = require('..')(manifestPath, {cdnUrl: 'http://d3.cloudfront.net'});
      assert.equal(assetPath('app.js'), '/app.js');
    });

    it('falls back to localPath if not provided', function() {
      var assetPath = require('..')(manifestPath, {env: 'production', localPath: '/assets'});
      assert.equal(assetPath('app.js'), '/assets/app-c27904c624.js');
    });
  });
});

