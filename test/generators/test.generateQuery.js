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


describe("generateQuery", function() {
  var assert                  = require('assert');
  var fs                      = require('fs');
  var path                    = require('path');
  var CompositeString         = require('composites').CompositeString;
  var generateReadPluralQuery = require('../../src/generators/generateQuery');
  var config;
  var query;
  var requiredParam = fs.readFileSync(
    path.resolve(__dirname, "../fixtures/generators/queries/requiredParam.js"),
    "utf8"
  );

  beforeEach(function() {
    config = {};
    query  = new CompositeString;
  });

  it("does nothing without config.params", function() {
    act();
    assert.equal(""+query, "");
  });

  it("adds required params and validation with config.params.required", function() {
    config.params={required:[{source:'req.username', name:'username'}]};
    act();
    assert.equal(""+query, requiredParam);
  });

  function act(){
    generateReadPluralQuery(config, query);
  }
});