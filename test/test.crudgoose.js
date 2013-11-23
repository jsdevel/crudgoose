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

describe("crudgoose", function(){
    var assert     = require('assert');
    var prequire   = require('proxyquire');
    var sinon      = require('sinon');
    //stubs
    var extractModels = sinon.stub().returns("_extractModels");
    var findConfig    = sinon.stub().returns("_findConfig");
    var findModels    = sinon.stub().returns("_findModels");
    var generateCrud  = sinon.stub().returns("_generateCrud");
    var outputModule  = sinon.stub().returns("_outputModule");

    //module
    var crudgoose  = prequire('../src/crudgoose', {
        './extractModels':extractModels,
        './findConfig'   :findConfig,
        './findModels'   :findModels,
        './generateCrud' :generateCrud,
        './outputModule' :outputModule
    });

    afterEach(function(){
        findConfig.reset();
    });

    it("is a function", function(){
        assert.equal(typeof crudgoose, 'function');
    });

    describe("when run", function(){
        beforeEach(function(){
            crudgoose();
        });

        it("should call extractModels", function(){
            sinon.assert.called(extractModels);
        });

        it("should call findConfig", function(){
            sinon.assert.called(findConfig);
        });

        it("should call findModels", function(){
            sinon.assert.called(findModels);
        });

        it("should call generateCrud", function(){
            sinon.assert.called(generateCrud);
        });

        it("should call outputModule", function(){
            sinon.assert.called(outputModule);
        });

        it("should pass the output of findConfig to findModels", function(){
            sinon.assert.calledWith(findModels, "_findConfig");
        });

        it("should pass the output of findConfig and findModels to extractModels", function(){
            sinon.assert.calledWith(extractModels, "_findConfig", "_findModels");
        });

        it("should pass the output of findConfig and extractModels to generateCrud", function(){
            sinon.assert.calledWith(generateCrud, "_findConfig", "_extractModels");
        });

        it("should pass the output of findConfig and generateCrud to outputModule", function(){
            sinon.assert.calledWith(outputModule, "_findConfig", "_generateCrud");
        });
    });

});