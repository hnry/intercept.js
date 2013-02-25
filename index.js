'use strict';

(function() {
var env = '';
if (typeof module !== 'undefined' && module.exports) env = 'node';
var exports = {};
if (env === 'node') {
  var layer = require('layer');
} else {
  exports = this;
  var layer = layer || this.layer;
}

exports.intercept = function (ctx, fn, interceptFn) {
  var result = false;
  var f = layer._find_context(ctx, fn, 0);
  layer.set(ctx, fn, function() {
    result = { called: true, args: Array.prototype.slice.call(arguments)};
    if (interceptFn && typeof interceptFn === 'function') interceptFn(result);
    layer.unset(f[0][f[1]]);
    return new layer.Stop();
  });

  return function() {
    return result;
  };
}
if (env === 'node') module.exports = exports.intercept;
})();
