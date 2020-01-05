"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var webpack_1 = __importDefault(require("webpack"));
var path_1 = __importDefault(require("path"));
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpack_config_base_1 = __importDefault(require("./config/webpack.config.base"));
var webpack_config_dev_1 = __importDefault(require("./config/webpack.config.dev"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var eventEmitter_1 = require("../helper/eventEmitter");
var CompilerCreator = /** @class */ (function (_super) {
    __extends(CompilerCreator, _super);
    function CompilerCreator(workDir) {
        var _this = _super.call(this) || this;
        _this.workDir = workDir;
        var compiler = webpack_1.default(webpack_merge_1.default({
            entry: path_1.default.resolve(_this.workDir, 'src/index.tsx'),
        }, webpack_config_base_1.default, _this.getDevConfig()));
        compiler.watch({}, function (err, stats) {
            if (!err) {
                console.log(stats.toString({
                    chunks: false,
                    colors: true,
                }));
                _this.emit('compiler', {});
            }
            else {
                console.error(err.message);
            }
        });
        _this.webpackCompiler = compiler;
        return _this;
    }
    Object.defineProperty(CompilerCreator.prototype, "compiler", {
        get: function () {
            return this.webpackCompiler;
        },
        enumerable: true,
        configurable: true
    });
    CompilerCreator.prototype.getDevConfig = function () {
        var base = webpack_config_dev_1.default;
        var plugins = [
            new html_webpack_plugin_1.default({
                template: path_1.default.resolve(this.workDir, 'template/index.html'),
            }),
        ];
        return webpack_merge_1.default(base, {
            plugins: plugins,
        });
    };
    return CompilerCreator;
}(eventEmitter_1.EventEmitter));
exports.CompilerCreator = CompilerCreator;
