"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestSequencer {
    constructor() {
        this.requestSequence = 0;
        this.lastCompleted = 0;
    }
    next() {
        return ++this.requestSequence;
    }
    isOldRequest(request) {
        return request < this.lastCompleted;
    }
    completed(request) {
        this.lastCompleted = request;
    }
}
exports.default = RequestSequencer;
