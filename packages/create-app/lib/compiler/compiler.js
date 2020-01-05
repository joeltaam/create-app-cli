"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var webpack_1 = __importDefault(require("webpack"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpack_config_base_1 = __importDefault(require("./config/webpack.config.base"));
var webpack_config_dev_1 = __importDefault(require("./config/webpack.config.dev"));
var CompilerCreator = /** @class */ (function () {
    function CompilerCreator(workDir) {
        this.workDir = workDir;
        var compiler = webpack_1.default(webpack_merge_1.default(webpack_config_base_1.default, webpack_config_dev_1.default));
    }
    return CompilerCreator;
}());
exports.CompilerCreator = CompilerCreator;
