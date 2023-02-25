"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = void 0;
const DaNumber_1 = __importDefault(require("./classes/DaNumber"));
const Darray_1 = __importDefault(require("./classes/Darray"));
const DaString_1 = __importDefault(require("./classes/DaString"));
const Dobject_1 = __importDefault(require("./classes/Dobject"));
function $(value) {
    if (value == null || value == undefined)
        return undefined;
    if (typeof value === "number")
        return DaNumber_1.default.new(value);
    if (typeof value === "string")
        return DaString_1.default.new(value);
    if (Array.isArray(value))
        return Darray_1.default.new(...value);
    if (value instanceof Object)
        return Dobject_1.default.new(value);
    return value;
}
exports.$ = $;
exports.default = $;
$();
