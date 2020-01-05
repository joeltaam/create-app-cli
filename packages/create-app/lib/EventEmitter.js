"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
    }
    EventEmitter.prototype.emit = function (eventName, data) {
        var callback = this.eventPool[eventName];
        if (callback) {
            callback(data);
        }
    };
    EventEmitter.prototype.on = function (eventName, callback) {
        this.eventPool[eventName] = callback;
        return this;
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
