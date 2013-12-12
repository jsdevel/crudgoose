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

describe("CompositeFactory", function(){
    var assert           = require('assert');
    var composites       = require('composites');
    var CompositeString  = composites.CompositeString;
    var CompositeFactory = require('../src/CompositeFactory');

    describe("instance", function(){
        var factory;

        beforeEach(function(){
            factory = new CompositeFactory;
        });

        describe("#createModule", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createModule() instanceof CompositeString);
            });
        });

        describe("#createRoutes", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createRoutes() instanceof CompositeString);
            });
        });

        describe("#createReadPlural", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createReadPlural() instanceof CompositeString);
            });
        });

        describe("#createRead", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createRead() instanceof CompositeString);
            });
        });

        describe("#createCreate", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createCreate() instanceof CompositeString);
            });
        });

        describe("#createQuery", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createQuery() instanceof CompositeString);
            });
        });

        describe("#createUpdate", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createUpdate() instanceof CompositeString);
            });
        });

        describe("#createDelete", function(){
            it("returns an instanceof CompositeString", function(){
                assert(factory.createDelete() instanceof CompositeString);
            });
        });
    });
});