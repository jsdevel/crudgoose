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

var chalk = require('chalk');

module.exports      = CLI;
CLI.prototype.chdir = chdir;
CLI.prototype.error = error;
CLI.prototype.exit  = exit;
CLI.prototype.log   = log;

function CLI(console, process){
    this._console = console;
    this._process = process;
    this.name     = 'crudgoose';
}

function chdir(path){
    this._process.chdir(path);
}

function error(msg){
    this.log('red', msg);
}

function exit(msg, code){
    if(typeof msg === 'number'){
        code = msg;
        msg  = void 0;
    }

    if(typeof msg === 'string'){
        this.log(code > 0 ? 'red' : 'green', msg);
    }
    this._process.exit(code);
}

function log(color, msg){
    this._console.log(
        chalk.bold("[")
        +chalk[color || 'green'](this.name)
        +chalk.bold("]")
        +" "+msg
    );
}
