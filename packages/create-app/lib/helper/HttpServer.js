"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var HTTPServer = /** @class */ (function () {
    function HTTPServer(_a) {
        var _this = this;
        var port = _a.port;
        this.middleware = [];
        var app = http_1.default.createServer(function (req, res) {
            _this.runMiddleware(req, res);
        });
        app.listen(port);
    }
    HTTPServer.prototype.use = function (fn) {
        this.middleware.push(fn);
    };
    HTTPServer.prototype.runMiddleware = function (req, res) {
        var _this = this;
        var index = 0;
        var iter = function (idx) {
            if (idx > _this.middleware.length) {
                return;
            }
            index = idx;
            var middleware = _this.middleware[idx];
            if (middleware) {
                middleware(req, res, iter.bind(null, index + 1));
            }
        };
        iter(index);
    };
    return HTTPServer;
}());
exports.HTTPServer = HTTPServer;
exports.serverStatic = function (dir) { return function (req, res, next) {
    var files = fs_1.default.readdirSync(dir);
    var url = req.url || '/';
    var fileName = url.substr(1);
    var getBuffer = function (name) { return fs_1.default.readFileSync(path_1.default.resolve(dir, name)); };
    if (url === '/') {
        var indexBuffer = getBuffer('index.html');
        next();
        return res.end(indexBuffer);
    }
    if (!files.includes(fileName)) {
        res.writeHead(404);
        res.end();
    }
    else {
        var buffer = getBuffer(fileName);
        res.end(buffer);
    }
    next();
}; };
