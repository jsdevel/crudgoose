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


describe("findConfig", function(){
    var assert     = require('assert');
    var config;
    var path       = require('path');
    var sinon      = require('sinon');
    var exitCodes  = require('../src/exitCodes');
    var findConfig = require('../src/findConfig');
    var console    = {
        error:sinon.stub()
    };
    var process    = {
        chdir:sinon.stub(),
        exit:sinon.stub()
    };

    afterEach(function(){
        process.chdir.reset();
        process.exit.reset();
        console.error.reset();
    });

    it("should exit with error code if the config isn't found", function(){
        findConfig("fooasdf"+Date.now(), process, console);
        sinon.assert.calledWith(process.exit, exitCodes.CONFIG_NOT_FOUND);
        sinon.assert.calledWith(console.error, sinon.match.string);
    });

    it("should exit with error code if the config is invalid", function(){
        findConfig(
            path.join("..", "test", "fixtures", "config", "invalid-crudgoose"),
            process,
            console
        );
        sinon.assert.calledWith(process.exit, exitCodes.CONFIG_INVALID);
        sinon.assert.calledWith(console.error, sinon.match.string);
    });

    it("should exit with error code if the config doesn't contain 'models'", function(){
        findConfig(
            path.join("..", "test", "fixtures", "config", "missing-models"),
            process,
            console
        );
        sinon.assert.calledWith(process.exit, exitCodes.CONFIG_MISSING_MODEL_PATHS);
        sinon.assert.calledWith(console.error, sinon.match.string);
    });

    it("should exit with error code if the config 'models' is empty", function(){
        findConfig(
            path.join("..", "test", "fixtures", "config", "empty-models"),
            process,
            console
        );
        sinon.assert.calledWith(process.exit, exitCodes.CONFIG_MISSING_MODEL_PATHS);
        sinon.assert.calledWith(console.error, sinon.match.string);
    });

    it("should return the config", function(){
        config = findConfig("crudgoose", process, console);
        assert(sinon.match.object.test(config));
        sinon.assert.called(process.chdir);
    });
});