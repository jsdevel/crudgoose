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

describe("generateReadPlural", function() {
    var assert = require('assert');
    var fs = require('fs');
    var path = require('path');
    var prequire = require('proxyquire');
    var sinon = require('sinon');
    var CompositeString = require('composites').CompositeString;

    var generateQuery = sinon.stub();
    var pluralize = sinon.stub();

    var generateReadPlural = prequire('../../src/generators/generateReadPlural', {
        './generateQuery':generateQuery,
        '../pluralize': pluralize
    });
    var compositeFactory;
    var config;
    var models;
    var readPlural;
    var expected = fs.readFileSync(
      path.resolve(__dirname, "../fixtures/generators/readPlural/readPlural.js"),
      "utf8"
    );
    var expectedWithPrefix = fs.readFileSync(
      path.resolve(__dirname, "../fixtures/generators/readPlural/routePrefix.js"),
      "utf8"
    );

    beforeEach(function() {
        compositeFactory = {
            createQuery: sinon.stub()
        };
        config = {};
        models = {};
        pluralize.reset();
        readPlural = new CompositeString;

        models['User'] = {};
        compositeFactory.createQuery.returns('//query');
        pluralize.withArgs(sinon.match(config), 'User').returns('users');
    });

    afterEach(function() {
        generateQuery.reset();
        pluralize.reset();
    });

    it("generates read routes for each model", function() {
        act();

        sinon.assert.calledWith(generateQuery, config, '//query');
        assert.equal(readPlural.toString(), expected);
    });

    it("adds path config.routes.prefix to the route", function() {
        config.routes={prefix:'/v3'};

        act();

        assert.equal(readPlural.toString(), expectedWithPrefix);
    });

    function act() {
        generateReadPlural(readPlural, config, models, compositeFactory);
    }
});