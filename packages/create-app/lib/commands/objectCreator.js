"use strict";
/* eslint-disable require-jsdoc */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var ObjectCreator = /** @class */ (function () {
    function ObjectCreator(workDir, projectName) {
        this.workDir = workDir;
        this.projectName = projectName;
        if (fs.existsSync(projectName)) {
            fs.removeSync(path.resolve(workDir, projectName));
        }
        fs.mkdirSync(projectName);
        var rootDir = path.resolve(__dirname, '../', '../', '../', 'create-react-template');
        fs.copySync(rootDir, path.resolve(this.workDir, this.projectName));
    }
    return ObjectCreator;
}());
exports.ObjectCreator = ObjectCreator;
