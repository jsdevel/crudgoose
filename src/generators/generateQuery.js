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

module.exports = generateQuery;

function generateQuery(config, query) {
  var params;
  if(!("params" in config))return;
  params = config.params;
  if(Array.isArray(params.required)){
    params.required.forEach(function(required){
      var name   = required.name;
      var source = required.source;

      query.push(
        "    if(!", source, ")return next(new Error('", source," was falsey.'));\n",
        "    query.", name, " = ", source, ";\n"
      );
    });
  }
}