dist:
		node build/build.js
		echo "'use strict';" > intercept.min.js
		./node_modules/uglify-js/bin/uglifyjs ./build/intercept.dist.js -mc >> intercept.min.js