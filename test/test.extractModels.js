/*
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


describe("extractModels", function(){
    var assert     = require('assert');
    var path       = require('path');
    var sinon      = require('sinon');
    var exitCodes  = require('../src/exitCodes');
    var extractModels = require('../src/extractModels');
    var config;
    var modelPaths;
    var models;
    var cli;


    beforeEach(function(){
        config     = {};
        modelPaths = [];
        models     = void 0;
        cli        = {
            exit:sinon.stub()
        };
    });

    it("expects mongoose#Schema to be instantiated with an object", function(){
        modelPaths.push(path.resolve(__dirname, "./fixtures/invalid-models/Schema_not_called.js"));

        act();

        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.MISSING_SCHEMA_DEFINITION);
        assert(~cli.exit.args[0][0].indexOf(modelPaths[0]));
    });

    it("expects mongoose#model to be called with a model name", function(){
        modelPaths.push(path.resolve(__dirname, "./fixtures/invalid-models/model_not_called.js"));

        act();

        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.MISSING_MODEL);
        assert(~cli.exit.args[0][0].indexOf(modelPaths[0]));
    });

    it("returns a models object", function(){
        modelPaths.push(path.resolve(__dirname, "./fixtures/easy-models/Bla.js"));

        models = act();

        assert(sinon.match({
            'Bla':{
                name:'string'
            }
        }).test(models));
    });


    function act(){
        return extractModels(config, modelPaths, cli);
    }
});