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

describe("CLI", function(){
    var assert     = require('assert');
    var prequire   = require('proxyquire');
    var sinon      = require('sinon');
    //stubs
    var chalk      = {};
    var console;
    var process;
    var CLI        = prequire('../src/CLI', {
        'chalk':chalk
    });

    beforeEach(function(){
        chalk.bold  = sinon.stub().returnsArg(0);
        chalk.green = sinon.stub().returnsArg(0);
        chalk.red   = sinon.stub().returnsArg(0);
        console     = {
            log:sinon.stub()
        };
        process     = {
            chdir:sinon.stub(),
            exit:sinon.stub()
        };
    });

    describe("instance", function(){
        var cli;

        beforeEach(function(){
            cli = new CLI(console, process);
        });

        it("is named 'crudgoose'", function(){
            assert.equal(cli.name, 'crudgoose');
        });


        it("has an error method", function(){
            assert.equal(typeof cli.error, 'function');
        });

        describe("#chdir", function(){
            it("changes the directory to the one given", function(){
                cli.chdir("asdf");
                sinon.assert.calledWith(process.chdir, "asdf");
            });
        });

        describe("#error", function(){
            it("starts with '[crudgoose]' and makes 'crudgoose' red", function(){
                cli.error("hello");
                sinon.assert.calledWith(chalk.red, 'crudgoose');
                sinon.assert.calledWith(chalk.bold, '[');
                sinon.assert.calledWith(chalk.bold, ']');
                sinon.assert.calledWith(console.log, "[crudgoose] hello");
            });
        });

        describe("#exit", function(){
            it("accepts one argument as a number", function(){
                cli.exit(5);
                sinon.assert.calledWith(process.exit, 5);
            });

            it("accepts two arguments, string message and number", function(){
                cli.exit("boo", 2);
                sinon.assert.calledWith(chalk.red, 'crudgoose');
                sinon.assert.calledWith(console.log, '[crudgoose] boo');
                sinon.assert.calledWith(process.exit, 2);
            });

            it("outputs green crudgoose on 0 exit code", function(){
                cli.exit("boo", 0);
                sinon.assert.calledWith(chalk.green, 'crudgoose');
            });
        });
    });
});