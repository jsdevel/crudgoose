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


module.exports = generateRoutes;

var generateReadPlural = require('./generateReadPlural');
var generateRead       = require('./generateRead');
var generateCreate     = require('./generateCreate');
var generateUpdate     = require('./generateUpdate');
var generateDelete     = require('./generateDelete');

function generateRoutes(
    routes,
    config,
    models,
    compositeFactory
){
    var readPlural = compositeFactory.createReadPlural();
    var read       = compositeFactory.createRead();
    var create     = compositeFactory.createCreate();
    var update     = compositeFactory.createUpdate();
    var _delete    = compositeFactory.createDelete();

    routes.push(readPlural, "\n");
    routes.push(read, "\n");
    routes.push(create, "\n");
    routes.push(update, "\n");
    routes.push(_delete, "\n");

    generateReadPlural(readPlural, config, models, compositeFactory);
    generateRead(read, config, models, compositeFactory);
    generateCreate(create, config, models, compositeFactory);
    generateUpdate(update, config, models, compositeFactory);
    generateDelete(_delete, config, models, compositeFactory);
}