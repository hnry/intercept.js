dist:
		node build/build.js
		echo "'use strict';" > intercept.min.js
		./node_modules/uglify-js/bin/uglifyjs ./build/intercept.dist.js -mc >> intercept.min.js
		rm -rf ./build/intercept.dist.js

pack:
		rm -rf package; rm -rf intercept*.tgz; 
		npm pack .
