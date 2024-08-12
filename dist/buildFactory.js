"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFactory = buildFactory;
function buildFactory(defaultObject) {
    return (overrides) => Object.assign({}, defaultObject, overrides);
}
