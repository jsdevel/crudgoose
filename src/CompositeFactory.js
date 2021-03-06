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

module.exports      = CompositeFactory;

CompositeFactory.prototype.createModule=createModule;
CompositeFactory.prototype.createRoutes=createRoutes;
CompositeFactory.prototype.createReadPlural=createReadPlural;
CompositeFactory.prototype.createRead=createRead;
CompositeFactory.prototype.createCreate=createCreate;
CompositeFactory.prototype.createQuery=createQuery;
CompositeFactory.prototype.createUpdate=createUpdate;
CompositeFactory.prototype.createDelete=createDelete;

var composites      = require('composites');
var CompositeString = composites.CompositeString;

function CompositeFactory(){}

function createModule(){
    return new CompositeString;
}

function createRoutes(){
    return new CompositeString;
}

function createReadPlural(){
    return new CompositeString;
}

function createRead(){
    return new CompositeString;
}

function createCreate(){
    return new CompositeString;
}

function createQuery(){
    return new CompositeString;
}

function createUpdate(){
    return new CompositeString;
}

function createDelete(){
    return new CompositeString;
}