"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var Question_1 = require("../helper/Question");
var clui_1 = require("clui");
var chalk_1 = __importDefault(require("chalk"));
var ObjectCreator = /** @class */ (function () {
    function ObjectCreator(workDir, projectName) {
        this.workDir = workDir;
        this.projectName = projectName;
        this.init();
    }
    ObjectCreator.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pjName, a, countdown, rootDir;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pjName = path.resolve(this.workDir, this.projectName);
                        if (!fse.existsSync(pjName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Question_1.Question("\u9879\u76EE " + chalk_1.default.green(pjName) + " \u5DF2\u7ECF\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF08y/n\uFF09\uFF1F").getAnswer()];
                    case 1:
                        a = _a.sent();
                        if (a.toLowerCase().indexOf('y') > -1 || a.toLowerCase().indexOf('yes') > -1) {
                            fse.removeSync(path.resolve(this.workDir, pjName));
                        }
                        else {
                            console.log(chalk_1.default.red('创建项目失败'));
                            process.exit(0);
                        }
                        _a.label = 2;
                    case 2:
                        countdown = new clui_1.Spinner("\u6B63\u5728\u521B\u5EFA\u9879\u76EE " + chalk_1.default.green(pjName) + " ...   ", [
                            '⣾',
                            '⣽',
                            '⣻',
                            '⢿',
                            '⡿',
                            '⣟',
                            '⣯',
                            '⣷',
                        ]);
                        countdown.start();
                        fse.mkdirSync(pjName);
                        rootDir = path.resolve(__dirname, '../', '../', '../', 'create-react-template');
                        setTimeout(function () {
                            fse.copySync(rootDir, path.resolve(_this.workDir, _this.projectName));
                            countdown.stop();
                            console.log("\n      -----------------------------------------\n      |                                       |\n      |                                       |\n      |              " + chalk_1.default.green('项目创建完成') + "             |\n      |                                       |\n      |                                       |\n      -----------------------------------------\n      ");
                        }, 100);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ObjectCreator;
}());
exports.ObjectCreator = ObjectCreator;
