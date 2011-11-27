const exec = require('child_process').exec,
	spawn = require('child_process').spawn,
	fs = require("fs"),
    bush = {};

bush.Project = function() {

};

bush.Project.prototype.scan = function() {
    
};

bush.Project.modules = {};

bush.Module = function(cwd) {
    this.cwd = cwd;
    if (cwd.indexOf("/") != 0) {
        this.cwd = process.cwd() + "/" + this.cwd;
    }
};

bush.Module.prototype.cwd = undefined;

bush.Module.prototype.runCmd = function(command, args, success, error) {
    const self = this;
	console.info("run cmd: %s in cwd %s with args %s", command, self.cwd, args);
	const p = spawn(command, args, {cwd: self.cwd});
	var buffer = "";
	p.stdout.setEncoding("utf8");
	p.stderr.setEncoding("utf8");

	p.stdout.on('data', function (e) {
		buffer = buffer + e;
	});
	p.stderr.on('data', function (e) {
		buffer = buffer + e;
	});
	p.on('exit', function (code) {
		if (code === 0) {
			if (success) success(buffer);
			console.info ("    finished cmd");
		} else {
			console.error('child process error with code %d ->\n   %s in cwd %s with args %s', code, command, self.cwd, args);			console.log(buffer);
			if (error) error(buffer);
		}

	});
};

exports.bush = bush;