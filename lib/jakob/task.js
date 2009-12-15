var JakobTaskError = function(){}
JakobTaskError.__proto__ = Error.prototype;

var Task = function(values) {
	
	this.name = values['name'];
	this.description = values['description'];	
	this.method = values['method'];
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
		
		if (options !== undefined) {
			options['name'] = options;
		} else {
			options = {name : this.name};
		}		
		
		this.run_dependencies(options, jakob_instance);
		return this.method(options);
	}
	
	this.run_dependencies = function(options, jakob_instance) {
		for(var i=0;i<=(this.depends.length-1);i++) {
			jakob_instance.invoke(this.depends[i], options);
		}
	}
	
	return this;
}

exports.Task = Task