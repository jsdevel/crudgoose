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
    var findConfig = require('../src/findConfig');

    beforeEach(function(){
        sinon.stub(process, 'exit');
        sinon.stub(console, 'log');
    });

    afterEach(function(){
        process.exit.restore();
        console.log.restore();
    });

    it("should exit with error code if the config isn't found", function(){
        findConfig("fooasdf"+Date.now(), process, console);
        sinon.assert.calledWith(process.exit, 1);
        sinon.assert.calledWith(console.log, sinon.match.string);
    });

    it("should exit with error code if the config is invalid", function(){
        findConfig(
            path.join("..", "test", "fixtures", "invalid-crudgoose"),
            process,
            console
        );
        sinon.assert.calledWith(process.exit, 2);
        sinon.assert.calledWith(console.log, sinon.match.string);
    });

    it("should return the config", function(){
        config = findConfig("crudgoose", process, console);
        assert(sinon.match.object.test(config));
    });
});