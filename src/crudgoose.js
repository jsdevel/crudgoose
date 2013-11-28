/*!
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var extractModels   = require('./extractModels');
var findConfig      = require('./findConfig');
var findModels      = require('./findModels');
var getConfig       = require('./getConfig');
var generateCrud    = require('./generateCrud');
var outputModule    = require('./outputModule');
var path            = require('path');

module.exports = crudgoose;

function crudgoose(cli){
    var configPath;
    var config;
    var modelPaths;
    var models;
    var crud;

    configPath = findConfig('crudgoose', cli);
    config     = getConfig(configPath, cli);

    cli.chdir(path.dirname(configPath));

    modelPaths = findModels(config, cli);
    models     = extractModels(config, modelPaths);
    crud       = generateCrud(config, models);
    outputModule(config, crud);
}