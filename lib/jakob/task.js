var JakobTaskError = function(){}
JakobTaskError.__proto__ = Error.prototype;

var Task = function(values) {
	
	this.name = values['name'];
	this.description = values['description'];	
	this.metthod = values['method'];
	this.namespace = values['namespace'];
	
	if (values['options'] !== undefined) {
		this.options = values['options'];
	} else {
		this.options = {}
	}			
	
	if ('depends' in this.options) {
		this.depends = this.options['depends'];
	} else {
		this.depends = [];
	}
		
	this.invoke = function(options, jakob_instance){
		this.run_dependencies(options, jakob_instance);
		return this.metthod(options);
	}
	
	this.run_dependencies = function(options, jakob_instance) {
		for(var i=0;i<=(this.depends.length-1);i++) {
			jakob_instance.invoke(this.depends[i]);
		}
	}
	
	return this;
}

exports.Task = Task