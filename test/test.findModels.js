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


describe("findModels", function(){
    var assert     = require('assert');
    var sinon      = require('sinon');
    var exitCodes  = require('../src/exitCodes');
    var findModels = require('../src/findModels');
    var cli;

    beforeEach(function(){
        cli        = {
            exit:sinon.stub()
        };
    });

    it("should return all models in a directory", function(){
        var models = findModels({
            models:['test/fixtures/models/**/*.js']
        }, cli);
        assert.equal(models.length, 3);
    });

    it("should exit when no models are found", function(){
        var models = findModels({
            models:['test/fixtures/models/foo/**/*.js']
        }, cli);
        assert.equal(models.length, 0);
        sinon.assert.calledWith(cli.exit, sinon.match.string, exitCodes.NO_MODELS_FOUND);
    });
});