var sys = require('sys');
var Context = require('./jakob/context').Context;

var Jakob = function(context_name, block){
	
	this.contexts = {};
	this.contexts['main'] = new Context();
	this.current_context = this.contexts['main'];
	
	
	if (block !== undefined) {
		block();	
	}
	
	this.task = function(task_name, task_method, task_options) {
		return this.current_context.task(task_name, task_method, task_options);
	}

	this.invoke = function(name, args){
		return this.current_context.invoke(name, args);
	}

	this.list = function(){
		for(name in this.contexts) {
			this.contexts[name].list();
		}
	}
	
	this.context = function(name, block){
		this.contexts[name] = new Context();
		this.current_context = this.contexts[name];
		block();
		this.current_context = this.contexts['main'];
	}	
		
	return this;
	
	// TODO: this.load = function(dir)
	// TODO: this.context = function...
}

exports.Jakob = Jakob;