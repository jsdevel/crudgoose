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

describe("generateRoutes", function(){
    var assert            = require('assert');
    var prequire          = require('proxyquire');
    var sinon             = require('sinon');
    var CompositeString   = require('composites').CompositeString;
    var generateReadPlural  = sinon.stub();
    var generateRead        = sinon.stub();
    var generateCreate      = sinon.stub();
    var generateUpdate      = sinon.stub();
    var generateDelete      = sinon.stub();
    var generateRoutes    = prequire('../../src/generators/generateRoutes', {
        "./generateReadPlural":generateReadPlural,
        "./generateRead":generateRead,
        "./generateCreate":generateCreate,
        "./generateUpdate":generateUpdate,
        "./generateDelete":generateDelete
    });
    var config           = {};
    var models           = {};
    var compositeFactory = {
        createReadPlural:sinon.stub().returns("_createReadPlural"),
        createRead:sinon.stub().returns("_createRead"),
        createCreate:sinon.stub().returns("_createCreate"),
        createUpdate:sinon.stub().returns("_createUpdate"),
        createDelete:sinon.stub().returns("_createDelete")
    };
    var routes;

    beforeEach(function(){
        compositeFactory.createReadPlural.reset();
        compositeFactory.createRead.reset();
        compositeFactory.createCreate.reset();
        compositeFactory.createUpdate.reset();
        compositeFactory.createDelete.reset();

        generateReadPlural.reset();
        generateRead.reset();
        generateCreate.reset();
        generateUpdate.reset();
        generateDelete.reset();
        routes = new CompositeString;
    });

    it("creates basic routes", function(){
        generateRoutes(routes, config, models, compositeFactory);

        assert.equal(routes.toString(), [
            "_createReadPlural",
            "_createRead",
            "_createCreate",
            "_createUpdate",
            "_createDelete\n"
        ].join('\n'));

        sinon.assert.calledWith(generateReadPlural, "_createReadPlural", config, models, compositeFactory);
        sinon.assert.calledWith(generateRead,       "_createRead",       config, models, compositeFactory);
        sinon.assert.calledWith(generateCreate,     "_createCreate",     config, models, compositeFactory);
        sinon.assert.calledWith(generateUpdate,     "_createUpdate",     config, models, compositeFactory);
        sinon.assert.calledWith(generateDelete,     "_createDelete",     config, models, compositeFactory);
    });
});