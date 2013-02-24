'use strict';

var intercept;

(function() {
var env = '';
if (typeof module !== undefined && module.exports) env = 'node';
var layer = (env === 'node') ? require('layer') : this.layer;

intercept = function (ctx, fn, interceptFn) {
  var result = false;
  var f = layer._find_context(ctx, fn, 0);
  layer.set(ctx, fn, function() {
    result = { called: true, arguments: arguments};
    if (auto) layer.unset(f[0][f[1]]);
    if (interceptFn && typeof interceptFn === 'function') interceptFn(result);
    return layer.proxyStop;
  });
  return function() {
    return result;
  };
}
if (env === 'node') module.exports = intercept;
})();
