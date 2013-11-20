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
describe("A CrudGoose", function(){
    var assert      = require('assert');
    var CrudGoose   = require('../src/CrudGoose');
    var expressApp  = require('./fixtures/expressApp');
    var path        = require('path');
    var sinon       = require('sinon');
    var temp        = require('temp');
    var tmpDir      = temp.mkdirSync("crudgoose");
    var commentPath = path.resolve(__dirname, "./fixtures/Schemas/Comment");
    var destPath    = path.resolve(tmpDir, "./fixtures/Schemas/Comment.js");

    temp.track();

    afterEach(function(){
        expressApp.delete.reset();
        expressApp.get.reset();
        expressApp.post.reset();
        expressApp.put.reset();
    });

    it("should require options", function(){
        assert.throws(function(){
            new CrudGoose(null);
        });
    });

    it("should require dest", function(){
        assert.throws(function(){
            new CrudGoose({});
        });
    });

    describe("instance", function(){
        var goose;
        var result;

        beforeEach(function(){
            goose = new CrudGoose({
                dest:destPath
            });
        });

        it("generates a module that routes all routes for a model", function(){
            goose.avoid(commentPath);
            goose.relocate();
            result = require(destPath);

            result.route(expressApp);

            sinon.assert.calledWith(expressApp.delete, "/comments");
            sinon.assert.calledWith(expressApp.get, "/comments");
            sinon.assert.calledWith(expressApp.post, "/comments");
            sinon.assert.calledWith(expressApp.put, "/comments");
        });
    });

});

