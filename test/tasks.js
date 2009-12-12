// To work without the jakob. prefix.
process.mixin(jakob);

task('example', function(options) {
	x = 'Example task: ' + options['name'];
	return x;
});

task('optionsname', function(options) {
	return options['name'];
});

task('runwithoptions', function(options) {
	return options['x'];
});

task('simple', function(options) {
	return true;
});
