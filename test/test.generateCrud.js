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


describe("generateCrud", function(){
    var assert             = require('assert');
    var prequire           = require('proxyquire');
    var sinon              = require('sinon');
    var compositeFactory   = {
        createModule:sinon.stub().returns("_createModule"),
        createRoutes:sinon.stub().returns("_createRoutes")
    };
    var generateModule     = sinon.stub();
    var generateRoutes     = sinon.stub();
    var generateCrud       = prequire('../src/generateCrud', {
        './generators/generateModule':generateModule,
        './generators/generateRoutes':generateRoutes
    });
    var config             = {};
    var models             = {};

    beforeEach(function(){
        generateCrud(config, models, compositeFactory);
    });

    it("should pass a module composite to generateModule", function(){
        sinon.assert.calledWith(generateModule, "_createModule", "_createRoutes");
    });

    it("should pass a routes composite to generateRoutes", function(){
        sinon.assert.calledWith(
            generateRoutes,
            "_createRoutes",
            config,
            models,
            compositeFactory
        );
    });
});