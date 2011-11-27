const fs = require("fs"),
    bush = require("./bush.js").bush;

bush.Module.prototype.goals = {};

bush.Module.prototype.mvnCommand = function () {
    const mavenHome = process.ENV['MAVEN_HOME'];
    if (fs.statSync(mavenHome + "/bin/mvn")) {
        return mavenHome + "/bin/mvn";
    } else {
        return mavenHome + "/bin/mvn.bat";
    }
};

bush.Module.prototype.install = function(props) {
    this.mvn(["install"], props);
};

bush.Module.prototype.mvn = function(commands, props, success, error) {
    const args = commands;

    if (props) {
        for (p in props) {
            args.push("-D" + p + "=" + props[p]);
        }
    }

    this.runCmd(this.mvnCommand(), args, success, error);
};

bush.Module.prototype.addGoal = function(goal) {
    console.log(goal);
    const self = this,
        plugin = goal.split(":")[0],
        goalName = goal.split(":")[1];

    if (!self.goals[plugin]) {
        self.goals[plugin] = {};
    }
    self.goals[plugin][goalName] = function(args) {
        self.mvn([goal], args);
    };
}

bush.Module.prototype.scanPlugin = function(plugin) {
    const self = this;
    const parse =  function(d) {
        const matcher = /\n([a-z0-9-:]+)|([ ][ ][ ][ ]([a-z0-9-]+))/g;
        var match = matcher.exec(d);
        while (match != null) {
            if (match[1]) {
                self.addGoal(match[1]);
            } else if (match[3]) {
                console.log(" - " + match[3]);
            }
            match = matcher.exec(d);
        }
        //console.log(d);
    }
    this.mvn(["help:describe"], {"plugin":plugin, "detail" : "true"}, parse);

}

exports.bush = bush;