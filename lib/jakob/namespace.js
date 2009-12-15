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
  
  this.get = function(name){
    if (name in this.tasks) {
      return this.tasks[name];
    } else {
      return false;
    }
  }

  this.add = function(task_name, task_method, task_options) {
    if (task_name.match(VALID_TASK_NAME)) {
      this.tasks[task_name] = new Task({ name: task_name, method : task_method, options : task_options });
      return this.tasks[task_name];
    } else {
      throw new JakobError("Name (" + task_name + ") must be valid");
      return false;
    }
  }
  
  return this;
}

exports.Namespace = Namespace;
exports.JakobError = JakobError;