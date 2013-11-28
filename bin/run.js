#!/usr/bin/env node
var CLI = require('../src/CLI');
require('../src/crudgoose')(new CLI(console, process));
