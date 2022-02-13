"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFactory = void 0;
function buildFactory(defaultObject) {
    return (overrides) => Object.assign({}, defaultObject, overrides);
}
exports.buildFactory = buildFactory;
