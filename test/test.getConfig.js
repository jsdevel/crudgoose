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


describe("getConfig", function(){
    var assert     = require('assert');
    var config;
    var path       = require('path');
    var sinon      = require('sinon');
    var exitCodes  = require('../src/exitCodes');
    var getConfig  = require('../src/getConfig');
    var cli;

    beforeEach(function(){
        cli        = {
            error:sinon.stub(),
            exit:sinon.stub(),
            log:sinon.stub()
        };
    });

    it("should exit with error code if the config is invalid", function(){
        getConfig(
            path.join("..", "test", "fixtures", "config", "invalid-crudgoose.json"),
            cli
        );
        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.CONFIG_INVALID);
    });

    it("should exit with error code if the config doesn't contain 'models'", function(){
        getConfig(
            path.join("..", "test", "fixtures", "config", "missing-models.json"),
            cli
        );
        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.CONFIG_MISSING_MODEL_PATHS);
    });

    it("should exit with error code if the config 'models' is empty", function(){
        getConfig(
            path.join("..", "test", "fixtures", "config", "empty-models.json"),
            cli
        );
        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.CONFIG_MISSING_MODEL_PATHS);
    });

    it("should return the config", function(){
        config = getConfig("../config/crudgoose.json", cli);
        assert(sinon.match.object.test(config));
    });
});