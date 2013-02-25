/*
 *  For building a minified browser version
 */

var fs = require('fs')
  , layer = require('layer')
  , intercept = require('../index');

var ws = fs.createWriteStream('./build/intercept.dist.js');

//ws.write('\'use strict\';\n');
ws.write('var intercept;');
ws.write('(function() {\n');

ws.write('var layer = {};');
ws.write('layer._find_context = ' + layer._find_context.toString() + '\n');
ws.write('layer.set = ' + layer.set.toString() + '\n');
ws.write('layer.unset = ' + layer.unset.toString() + '\n');
ws.write('layer.Stop = ' + layer.Stop.toString() + '\n');

ws.write('intercept = ' + intercept.toString());

ws.write('}());');