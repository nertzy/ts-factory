"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assign = require("lodash.assign");
function buildFactory(defaultObject) {
    return function (overrides) { return assign({}, defaultObject, overrides); };
}
exports.buildFactory = buildFactory;
