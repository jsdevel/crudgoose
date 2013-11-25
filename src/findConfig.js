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
findConfig.CONFIG_NOT_FOUND             = 1;
findConfig.CONFIG_INVALID               = 2;
findConfig.CONFIG_MISSING_MODEL_PATHS   = 3;

var chalk     = require('chalk');
var findUp    = require('findup-sync');
var path      = require('path');

function findConfig(name, process, console){
    var proposed     = path.join("config", name+".json");
    var configPath   = findUp(proposed);
    var config;

    if(!configPath){
        return exit(
            "Couldn't find "+proposed+" in any parent directory.",
            findConfig.CONFIG_NOT_FOUND
        );
    }

    try {
        config = require(configPath);

        if(!Array.isArray(config.models)){
            return exit(
                "The config didn't contain 'models' as an array of paths",
                findConfig.CONFIG_MISSING_MODEL_PATHS
            );
        }

        if(!config.models.length){
            return exit(
                "The config 'models' was a zero length array",
                findConfig.CONFIG_MISSING_MODEL_PATHS
            );
        }

        return config;
    } catch(e){
        return exit(
            "Failed to load "+configPath+" due to: "+e,
            findConfig.CONFIG_INVALID
        );
    }

    function exit(msg, code){
        console.log(chalk.red(msg));
        return process.exit(code);
    }
}