'use strict';

var testing123;

(function() {
var env = '';
if (typeof module !== undefined && module.exports) env = 'node';
var layer = (env === 'node') ? require('../layer/index') : this.layer;

testing123 = function (ctx, fn, auto) {
  var auto = auto || true;
  var stub = false;
  var f = layer._find_context(ctx, fn, 0);
  layer.set(ctx, fn, function() {
    stub = { called: true, arguments: arguments};
    if (auto) layer.unset(f[0][f[1]]);
    return layer.proxyStop;
  });
  return function() {
    return stub;
  };
}
if (env === 'node') module.exports = testing123;
})();
