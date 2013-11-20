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
var fs         = require('fs-extra');
var mongoose   = require('mongoose');
var path       = require('path');
var prequire   = require('proxyquire');
var sinon      = require('sinon');

module.exports = CrudGoose;
CrudGoose.prototype.avoid=avoid;
CrudGoose.prototype.relocate=relocate;

function CrudGoose(options){
    var models = {};
    if(!options || typeof options !== 'object'){
        throw new Error("options must be an object");
    }

    if(!("dest" in options) || !options.dest){
        throw new Error("dest is a required option");
    }

    Object.defineProperty(this, "options", {
        get:function(){return options;},
        enumerable:true
    });

    Object.defineProperty(this, "models", {
        get:function(){return models;},
        enumerable:true
    });

    fs.mkdirsSync(path.dirname(options.dest));
}

function avoid(modelPath){
    var model;
    sinon.spy(mongoose, "model");
    sinon.spy(mongoose, "Schema");

    debugger;

    try {
        model=prequire(modelPath, {
            mongoose:mongoose
        });

        if(!mongoose.Schema.called){
            throw new Error("mongoose#Schema wasn't called in: "+modelPath);
        }

        if(!mongoose.model.called){
            throw new Error("mongoose#model wasn't called in: "+modelPath);
        }

    } catch(e){
        throw e;
    } finally {
        mongoose.model.restore();
        mongoose.Schema.restore();
    }

}

function relocate(){
    var dest = this.options.dest;

    fs.writeFileSync(this.options.dest, [
"module.exports={",
"  route:function(app){",
"  }",
"};"
    ].join('\n'));
}