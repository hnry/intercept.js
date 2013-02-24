[![Build Status](https://travis-ci.org/lovebear/intercept.js.png)](https://travis-ci.org/lovebear/intercept.js)

# intercept.js

small library to intercept a function from being called without modifying the function. or messing with your existing code.

- can be used set up mocks for tests `var called = intercept(this, testFunction)`
- or something like, `if (unexpected_error) intercept(this, save_to_db, recover)`

### How to use

`var called = intercept(context, function_to_intercept, listenerFunction)
`

`function_to_intercept`:
The function to intercept. When this function is called, `called` will be populated and if there's a `listenerFunction` that will be notified. The next time `function_to_intercept` is called, it'll work as normal. (It intercepts once.)

`context`:
The 'this' of `function_to_intercept`

`called`:
(optional) false, will be populated with information when `function_to_intercept` is called

`listenerFunction`:
(optional) will be called when `function_to_intercept` is called


Example for using it to setup mocks for tests:
```js
// real function to mock / test
function Cat() {}
Cat.prototype.give = function(something) {
    if (something === 'catnip') throw new Error('CAT NIP!!!')
}

// start test
// setup intercept, result is 'false'
var result = intercept(Cat.prototype, Cat.prototype.give);

var cat = new Cat();

// call like normal, it gets intercepted, no error thrown
cat.give('catnip');

// result() is now populated
assert(result).is.eql({called: true, arguments: ['catnip'] })

// it resets your function back to normal
// so when called again, this will throw the error
cat.give();

// ( basically you don't have reset the mock or do anything else! )
```

### Installing

Node:

`npm install intercept.js`

Browser:

Use the intercept.min.js file
