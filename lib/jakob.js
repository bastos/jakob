var sys = require('sys');
var Namespace = require('./jakob/namespace').Namespace;

var Jakob = function(parent){
	
	this.name = null;
	this.ns = new Namespace();
	this.contexts = {}
	this.parent = parent;
	this.objectPointer = this;

	this.task = function(task_name, task_method, task_options) {
		return this.ns.add(task_name, task_method, task_options);
	}

	this.find = function(name){
		if (name.match(/^(:)/)) { // Upper Namespace.
			return this.parent.find(name.slice(1, name.length));	
		} else if (name.match(/(:)/)) { // Find the Namespace recursively.
			var names = name.split(':');
			var namespace = names.shift();				
			var rest = names.join(':');			
			return this.contexts[namespace].find(rest);
		} else { // There is no namespace.
			return this.ns.get(name);	
		}		
	}

	this.invoke = function(name, args) {
		var task = this.find(name);
		if(task) {
			return task.invoke(args, this);	
		} else {
			throw new JakobError("Task (" + name + ") not found!");
		}
	}

	this.list = function(){
		for(t in this.ns.list()) {
				sys.puts(t);
		}
	}
	
	this.namespace = function(name, block) {
		this.contexts[name] = new Jakob(this);
		this.contexts[name].name = name;
		block(this.contexts[name]);
	}
	
	return this;
}

exports.Jakob = Jakob;