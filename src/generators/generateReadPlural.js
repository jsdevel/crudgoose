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

module.exports = generateReadPlural;

var pluralize = require('../pluralize');

function generateReadPlural(readPlural, config, models, compositeFactory) {
  var model;
  var plural;
  var query;

  for (model in models) {
    plural = pluralize(config, model);
    query = compositeFactory.createQuery();
    readPlural.push(
      "  app.get('/", plural, "', function(req, res, next){\n",
      "    var query = {};\n",
      "    ", query, '\n',
      "    ", model, ".find(query, function(err, ", plural, "){\n",
      "      if(err)return next(err);\n",
      "      res.json(", plural, ");\n",
      "    });\n",
      "  });\n"
      );
  }
}