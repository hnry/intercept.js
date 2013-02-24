'use strict';

var testing123;

(function() {
var env = '';
if (typeof module !== undefined && module.exports) env = 'node';
var layer = (env === 'node') ? require('layer') : this.layer;

var testing123 = function (ctx, fn, auto) {

  layer.set(ctx, fn, function() {

  });
}

if (env === 'node') module.exports = testing123
});
