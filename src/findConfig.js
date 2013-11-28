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

"use strict";

module.exports = findConfig;

var exitCodes  = require('./exitCodes');

var findUp    = require('findup-sync');
var path      = require('path');

function findConfig(name, cli){
    var proposed     = path.join("config", name+".json");
    var configPath   = findUp(proposed);

    if(!configPath){
        return cli.exit(
            "Couldn't find "+proposed+" in any parent directory.",
            exitCodes.CONFIG_NOT_FOUND
        );
    }

    return configPath;
}