#!/usr/bin/env node

const bush = require("../../maven-plugin.js").bush,
    sampleProject = new bush.Module("sample");

//sampleProject.install();
sampleProject.scanPlugin("eclipse");