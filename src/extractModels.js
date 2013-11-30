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

module.exports = extractModels;

var exitCodes  = require('./exitCodes');
var mongoose   = require('mongoose');
var sinon      = require('sinon');

function extractModels(modelPaths, cli){
    var models = {};
    sinon.spy(mongoose, 'model');
    sinon.spy(mongoose, 'Schema');

    modelPaths.forEach(function(path){
        require(path);

        if(!mongoose.Schema.args.length){
            return cli.exit(
                "Schema wasn't called in "+path,
                exitCodes.MISSING_SCHEMA_DEFINITION
            );
        }

        if(!mongoose.model.args.length){
            return cli.exit(
                "model wasn't called in "+path,
                exitCodes.MISSING_MODEL
            );
        }

        models[mongoose.model.args[0][0]] = mongoose.Schema.args[0][0];

        mongoose.model.reset();
        mongoose.Schema.reset();
    });

    mongoose.model.restore();
    mongoose.Schema.restore();

    return models;
}