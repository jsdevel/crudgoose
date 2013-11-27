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

module.exports = findModels;

var glob      = require('glob');
var _         = require('lodash');
var exitCodes = require('./exitCodes');

function findModels(config, process, console){
    var files = _(config.models).map(function(pattern) {
      return glob.sync(pattern);
    }).flatten().uniq().value();

    if(!files.length){
        console.error("No models were found.");
        process.exit(exitCodes.NO_MODELS_FOUND);
    }

    return files;
}