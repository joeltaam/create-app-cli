"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectCreator_1 = require("./commands/objectCreator");
var devServer_1 = require("./commands/devServer");
/* eslint-disable require-jsdoc */
var CLI = /** @class */ (function () {
    function CLI(workDir) {
        var cmd = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            cmd[_i - 1] = arguments[_i];
        }
        this.workDir = workDir;
        var command = cmd[0], args = cmd[1];
        this.handleCommand(command, args);
    }
    CLI.prototype.handleCommand = function (cmd, args) {
        switch (cmd) {
            case 'create':
                new objectCreator_1.ObjectCreator(this.workDir, args);
                break;
            case 'dev':
                new devServer_1.DevServer(this.workDir);
                break;
            case 'build':
                console.log('build!!!!');
                break;
            default:
                console.log('fuck!!!!');
        }
    };
    return CLI;
}());
exports.CLI = CLI;
