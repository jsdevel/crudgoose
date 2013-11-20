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
describe("A ModelGatherer", function(){
    var prequire = require('proxyquire');
    var sinon    = require('sinon');
    var fs       = {
        existsSync:sinon.stub
    };
    var mongoose = {
        model:sinon.stub(),
        Schema:sinon.stub()
    };


    it("should expect an existing directory", function(){

    });

    it("should expect files in the given directory", function(){

    });

    it("should expect files to expose an instance of mongoose schema", function(){

    });

    it("should be able to provide a model with a 'next' method", function(){

    });

});