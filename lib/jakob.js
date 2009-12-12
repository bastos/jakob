var sys = require('sys');
var Context = require('./jakob/context').Context;

var Jakob = function(parent){
	
	this.name = null;
	this.context = new Context();
	this.namespaces = {}
	this.parent = parent;
	this.objectPointer = this;

	this.task = function(task_name, task_method, task_options) {
		return this.context.task(task_name, task_method, task_options);
	}

	this.invoke = function(name, args) {
		if (name.match(/^(:)/)) { // Upper Namespace.
			return this.parent.invoke(name.slice(1, name.length), args);	
		} else if (name.match(/(:)/)) { // Find the Namespace recursively.
			var names = name.split(':')
			var namespace = names.shift();				
			var rest = names.join(':');			
			return this.namespaces[namespace].invoke(rest, args);
		} else { // There is no namespace.
			return this.context.invoke(name, args);	
		}
	}

	this.list = function(){
		for(t in this.context.list()) {
				sys.puts(t);
		}
	}
	
	this.namespace = function(name, block) {
		this.namespaces[name] = new Jakob(this)
		this.namespaces[name].name = name		
		block(this.namespaces[name]);
	}
	
	return this;
}

exports.Jakob = Jakob;