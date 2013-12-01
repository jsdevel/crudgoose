#!/usr/bin/env node
var CLI              = require('../src/CLI');
var CompositeFactory = require('../src/CompositeFactory');
require('../src/crudgoose')(
    new CLI(console, process),
    new CompositeFactory
);
