var layer = require('layer')
  , should = require('should')
  , intercept = require('../index.js');

describe('intercept', function() {

  it('stubs', function() {
    var ctx = {
      hi: function(x, y, z) {
        throw new Error('hi got called');
      }
    }
    var stub = intercept(ctx, ctx.hi);
    // stays false until ctx.hi is called
    stub().should.be.equal(false);

    ctx.hi(1, 2, 3);

    // once called it populates with some information
    stub().should.eql({called: true, arguments: [1,2,3] });

    // the stubbed function automatically resets after the stub is called
    var error = false;
    try {
      ctx.hi(1, 2, 3);
    } catch(e) {
      error = true;
    }
    error.should.be.equal(true);
  });

  it('manually reset stub', function() {

  });

});