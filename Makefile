test:
		@mocha -R spec

release:
		make dist; make pack

dist:
		node build/build.js
		echo "// Copyright lovebear https://github.com/lovebear/intercept.js" > intercept.min.js
		echo "'use strict';" >> intercept.min.js
		./node_modules/uglify-js/bin/uglifyjs ./build/intercept.dist.js -mc >> intercept.min.js
		rm -rf ./build/intercept.dist.js

pack:
		rm -rf package; rm -rf intercept*.tgz; 
		npm pack .

.PHONY: test