sys = require("sys");
process.mixin(require("./common"));

// Testing tasks using process.mixin:
process.mixin(require("./tasks"));

// Testing simple tasks:
jakob.task('example', function(options) {
	x = 'Example task: ' + options['name'];
	return x;
});

jakob.task('optionsname', function(options) {
	return options['name'];
});

jakob.task('runwithoptions', function(options) {
	return options['x'];
});

jakob.task('simple', function(options) {
	return true;
});

assert.notEqual(false, jakob.task('create', function(options){}), "Create a task");

assert.equal('Example task: example', jakob.invoke('example'), "Simple task");

assert.equal('optionsname', jakob.invoke('optionsname'), "Has name on options");

assert.equal(10, jakob.invoke('runwithoptions', {x : 10}), "Test Options parameters");
	
assert.throws(function(){
	jakob.task('Name with spaces', function(options) {
		return true;
	});
}, JakobError);

assert.throws(function(){
	invoke('TaskDoesNotExists');
}, JakobError);

assert.equal('optionsname', jakob.invoke('optionsname'), "Has name on options");

// Testing namespaces:

jakob.namespace('test', function(test) {
	test.task('simplewithnamespace', function(options) {
		return true;
	});
	
	test.namespace('namespace2', function(test) {
		test.task('simplewithnamespace2', function(options) {
			return true;
		});		
	});
	
	assert.equal(true, test.invoke(':simple'), "Called a task from the upper namespace");
	
});

assert.equal(true, jakob.invoke('test:simplewithnamespace'), "Called a task with namespace");
assert.equal(true, jakob.invoke('test:namespace2:simplewithnamespace2'), "Called a task with nested namespaces");

// Test Dependencies
jakob.task('runfirst', function(options) {
	sys.puts("FIRST")
	return true;
});

jakob.task('second', function(options) {
	sys.puts("SECOND")
	return true;
}, { depends : ["runfirst"] })

jakob.invoke('second');

// List all tasks:
// jakob.list();