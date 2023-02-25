"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anytool_1 = require("anytool");
class DaNumberConstructor extends Number {
    static new(value) {
        return new DaNumber(value);
    }
    /**
     * Get random integer from range
     *
     * @param {number} min min of range
     * @param {number} max max of range
     * @returns {DaNumber}
     */
    static random(min, max) {
        return DaNumber.new((0, anytool_1.randomNumber)(min, max));
    }
    static isDaNumber(val) {
        return val instanceof DaNumber;
    }
    constructor(value) {
        super(value);
    }
    format(locale = "en-us") {
        return Number.parseFloat(this.toString()).toLocaleString(locale);
    }
    /**
     * Wheter or not number is even
     *
     * @returns {boolean}
     */
    even() {
        return Number(this) % 2 === 1;
    }
    /**
     * Wheter or not number is odd
     *
     * @returns {boolean}
     */
    odd() {
        return Number(this) % 2 === 0;
    }
    /**
     * Similar with Math.round
     *
     * @returns {DaNumber}
     */
    round() {
        return DaNumber.new(Math.round(Number(this)));
    }
    /**
     * Similar with Math.ceil
     *
     * @returns {DaNumber}
     */
    ceil() {
        return DaNumber.new(Math.ceil(Number(this)));
    }
    /**
     * Similar with Math.floor
     *
     * @returns {DaNumber}
     */
    floor() {
        return DaNumber.new(Math.floor(Number(this)));
    }
    /**
     * Logs number
     */
    log() {
        console.log(Number(this));
    }
}
const DaNumber = DaNumberConstructor;
exports.default = DaNumber;
