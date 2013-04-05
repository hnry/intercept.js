var layer = require('layer')
  , should = require('should')
  , intercept = require('../index.js');

describe('intercept', function() {

  it('intercepts stuff', function() {
    var ctx = {
      hi: function(x, y, z) {
        throw new Error('hi got called');
      }
    }
    var result = intercept(ctx, ctx.hi);
    // stays false until ctx.hi is called
    result().should.be.equal(false);

    ctx.hi(1, 2, 3);

    // once called it populates with some information
    result().should.eql({called: true, args: [1,2,3] });

    // the intercepted function automatically resets after the result is called
    var error = false;
    try {
      ctx.hi(1, 2, 3);
    } catch(e) {
      error = true;
    }
    error.should.be.equal(true);
  });

  it('calls intercepting func if there is one', function(done) {
    var ctx = {
      hi: function(x, y, z) {
        throw new Error('hi got called');
      }
    }

    var intercepting = function(result2) {
      result().should.eql({called: true, args: [1,2,3] });
      result2.should.eql({called: true, args: [1,2,3] });
      done();
    }

    var result = intercept(ctx, ctx.hi, intercepting);
    // stays false until ctx.hi is called
    result().should.be.equal(false);
    ctx.hi(1, 2, 3);
  });

  it('resets the interception', function() {
    var ctx = {
      hi: function(x, y, z) {
        throw new Error('hi got called');
      }
    }
    var result = intercept(ctx, ctx.hi);
    // stays false until ctx.hi is called
    result().should.be.equal(false);

    // reset the interception
    result.reset();

    var error = false;
    try {
      ctx.hi(1, 2, 3);
    } catch(e) {
      error = true;
    }
    error.should.be.equal(true);

    // calling reset again does nothing
    result.reset();
  });

});