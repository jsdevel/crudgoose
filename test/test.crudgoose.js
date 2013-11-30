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
    var getConfig     = sinon.stub().returns("_getConfig");
    var findConfig    = sinon.stub().returns("/path/to/config.json");
    var findModels    = sinon.stub().returns("_findModels");
    var generateCrud  = sinon.stub().returns("_generateCrud");
    var outputModule  = sinon.stub().returns("_outputModule");
    var cli           = {
        chdir:sinon.stub()
    };

    //module
    var crudgoose  = prequire('../src/crudgoose', {
        './extractModels':extractModels,
        './findConfig'   :findConfig,
        './getConfig'    :getConfig,
        './findModels'   :findModels,
        './generateCrud' :generateCrud,
        './outputModule' :outputModule
    });

    afterEach(function(){
        extractModels.reset();
        getConfig.reset();
        findConfig.reset();
        findModels.reset();
        generateCrud.reset();
        outputModule.reset();
        cli.chdir.reset();
    });

    it("is a function", function(){
        assert.equal(typeof crudgoose, 'function');
    });

    describe("when run", function(){
        beforeEach(function(){
            crudgoose(cli);
        });

        it("should call findConfig with 'crudgoose'", function(){
            sinon.assert.calledWith(findConfig, 'crudgoose', cli);
        });

        it("should call chdir with '/path/to'", function(){
            sinon.assert.calledWith(cli.chdir, '/path/to');
        });

        it("should pass the output of findConfig to getConfig", function(){
            sinon.assert.calledWith(getConfig, "/path/to/config.json", cli);
        });

        it("should pass the output of findConfig to getConfig", function(){
            sinon.assert.calledWith(getConfig, "/path/to/config.json", cli);
        });

        it("should pass the output of getConfig to findModels", function(){
            sinon.assert.calledWith(findModels, "_getConfig", cli);
        });

        it("should pass the output of getConfig and findModels to extractModels", function(){
            sinon.assert.calledWith(extractModels, "_getConfig", "_findModels", cli);
        });

        it("should pass the output of getConfig and extractModels to generateCrud", function(){
            sinon.assert.calledWith(generateCrud, "_getConfig", "_extractModels");
        });

        it("should pass the output of getConfig and generateCrud to outputModule", function(){
            sinon.assert.calledWith(outputModule, "_getConfig", "_generateCrud");
        });
    });

});