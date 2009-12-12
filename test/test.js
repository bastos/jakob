process.mixin(require("./common"));
process.mixin(require("./tasks"));

assert.equal(true, jakob.task('create', function(options){}), "Create a task");

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

jakob.context('test', function() {
	jakob.task('simplewithnamespace', function(options) {
		return true;
	})
});

jakob.list();