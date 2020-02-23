"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var fse = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ProjectCreator_1 = require("./commands/ProjectCreator");
var DevServer_1 = require("./commands/DevServer");
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
                new ProjectCreator_1.ObjectCreator(this.workDir, args);
                break;
            case 'dev':
                new DevServer_1.DevServer(this.workDir);
                this.loadEnv();
                break;
            case 'build':
                console.log('build!!!!');
                break;
            default:
                console.log('default!!!!');
        }
    };
    CLI.prototype.loadEnv = function () {
        var envPath = path_1.default.resolve(this.workDir, './.env');
        if (fse.existsSync(envPath)) {
            var env = fs_1.default.readFileSync(envPath).toString();
            env.split(/\n/).forEach(function (line) {
                var _a = line.split('='), k = _a[0], v = _a[1];
                process.env[k] = v;
            });
        }
    };
    return CLI;
}());
exports.CLI = CLI;
