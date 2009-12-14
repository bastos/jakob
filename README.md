Jakob a Make/Rake for Node.js
=============================

How to use:

Create a file Jakobfile.js and add tasks like this:

	task('test', function(options) {
		sys.puts("It Works");
		return true;
	});

Example:

	$ jakob simple
	>> It Works

Namespaces:

	namespace('test', function(test) {
		test.task('simplewithnamespace', function(options) {
			sys.puts("hey");
			return true;
		});
	
		test.namespace('namespace2', function(test) {
			test.task('simplewithnamespace2', function(options) {
				sys.puts("ho");			
				return true;
			});		
		});
	
	});
	
So type on your terminal:

	$ jakob test:namespace2:simplewithnamespace2
	>> ho

Dependencies:

	jakob.task('runfirst', function(options) {
		sys.puts("FIRST")
	});

	jakob.task('second', function(options) {
		sys.puts("SECOND")
	}, { depends : ["runfirst"] })

See more examples on test/test.js

TODO:

* Lots of things. This is just a experiment right now. Is really nice play with Node.

How to Install?

By now just do something like this:

	export NODE_PATH=~/jakob/lib:$NODE_PATH
	export PATH=~/jakob/bin:$PATH