(function () {

  var assert = require('chai').assert;
  var jsdom = require('jsdom').jsdom;

  describe('Playground', function () {
    before(function (complete) {
      jsdom.env({
        file: 'test/test.html',
        features: {
          FetchExternalResources: ['script'],
          ProcessExternalResources: ['script']
        },
        done: function (errors, window) {
          GLOBAL.window = window;
          GLOBAL.document = window.document;
          GLOBAL.playground = require('../lib/main');
          GLOBAL.document.addEventListener("DOMContentLoaded", function() {
            complete();
          });
        } 
      });

    });

    it('Playground files can be loaded', function () {
      var playgroundInstance = new playground({});
      assert.isObject(playgroundInstance);
    });

    it('Has populated', function () {
      var out = document.getElementById('out');
      assert.notEqual(out.value, '', 'Contains content');
      assert.match(out.value, /span {/, 'Contains some of the css expected');
    });
  });

}());
