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

describe("generateModule", function(){
    var assert           = require('assert');
    var fs               = require('fs');
    var path             = require('path');
    var sinon            = require('sinon');
    var CompositeString  = require('composites').CompositeString;
    var generateModule   = require('../../src/generators/generateModule');
    var module;

    //expected code
    var generatedShell   = fs.readFileSync(
        path.resolve(__dirname, '../fixtures/generators/generateModule/shell.js'),
        'utf8'
    );

    beforeEach(function(){
        module = new CompositeString;
    });

    it("creates a basic module", function(){
        generateModule(module, '//routes');

        assert.equal(module.toString(), generatedShell);
    });
});