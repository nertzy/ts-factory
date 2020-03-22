"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildFactory(defaultObject) {
    return (overrides) => Object.assign({}, defaultObject, overrides);
}
exports.buildFactory = buildFactory;
