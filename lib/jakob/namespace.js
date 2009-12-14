var Task = require('./task').Task;
var sys = require('sys');

var JakobError = function(){}
JakobError.__proto__ = Error.prototype;

var VALID_TASK_NAME = /^([a-zA-Z0-9_:]*)$/;

var Namespace = function(name) { 
	
	this.tasks = {};

	this.list = function() {
		return this.tasks;
	}

  this.task = function(task_name, task_method, task_options) {
		if (task_name.match(VALID_TASK_NAME)) {
			this.tasks[task_name] = new Task({ name: task_name, method : task_method, options : task_options });
			return this.tasks[task_name];
		} else {
			throw new JakobError("Name (" + task_name + ") must be valid");
			return false;
		}
  }

	this.invoke = function(task_name, args, jakob_instance) {
		if (args !== undefined) {
			args['name'] = task_name;
		} else {
			args = {name : task_name};
		}
		if (this.tasks[task_name] !== undefined) {
			return this.tasks[task_name].invoke(args, jakob_instance);
		} else {
			throw new JakobError("Task (" + task_name + ") does not exits");				
		}
	}
	
	return this;
}

exports.Namespace = Namespace;
exports.JakobError = JakobError;