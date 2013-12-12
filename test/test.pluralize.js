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


describe("pluralize", function() {
    var pluralize = require('../src/pluralize');
    var assert = require('assert');

    it("lowercases input", function() {
        assert.equal(pluralize({}, 'UsEr'), 'users');
    });

    it("only lowercases if config.pluralize == false", function() {
        assert.equal(pluralize({pluralize: false}, 'UsEr'), 'user');
    });

    it("lowercases if config.pluralize == true", function() {
        assert.equal(pluralize({pluralize: true}, 'UsEr'), 'users');
    });
});