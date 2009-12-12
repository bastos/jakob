var Task = function(values) {
	this.name = values['name'];
	this.description = values['description'];	
	this.options = values['options'];		
	this.metthod = values['method'];
	this.namespace = values['namespace']
	this.invoke = function(options){
		return this.metthod(options);
	}
	return this;
}

exports.Task = Task