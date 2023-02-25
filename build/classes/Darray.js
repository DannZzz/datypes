"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anytool_1 = require("anytool");
class DarrayConstructor extends Array {
    static new(...vals) {
        return new DarrayConstructor(...vals);
    }
    static isDarray(val) {
        return val instanceof Darray;
    }
    constructor(...vals) {
        super(...vals);
    }
    /**
     * Shuffles and returns new Darray
     *
     * @returns {Darray<T>}
     */
    shuffle() {
        const arr = this.slice(0);
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return DarrayConstructor.new(...arr);
    }
    /**
     * Wheter or not the array is empty
     *
     * @returns {boolean}
     */
    empty() {
        return !!this.length;
    }
    /**
     * Shuffles current array
     */
    shuffleThis() {
        const arr = this;
        for (let i = arr.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    /**
     * Wheter or not arrays are the same
     *
     * @link
     * https://github.com/DannZzz/anytool
     *
     * @param {any[]} array
     * @returns {boolean}
     */
    same(array) {
        if (!array || !Array.isArray(array) || this.length !== array.length)
            return false;
        return (0, anytool_1.equal)(this, array);
    }
    /**
     * Returns new readonly array (TS)
     *
     * @returns {ReadonlyArray<T>}
     */
    readonly() {
        return [...this];
    }
    /**
     * Removes duplicates
     *
     * @returns {Darray<T>}
     */
    unique() {
        return DarrayConstructor.new(...new Set(this));
    }
    remove(...indexes) {
        if (!indexes.length)
            return;
        if (indexes.length === 1) {
            this.splice(indexes[0], 1);
        }
        else {
            const filtered = this.filter((_, i) => !indexes.includes(i));
            this.length = 0;
            this.push(...filtered);
        }
    }
    /**
     * Logs this array
     */
    log() {
        console.log([...this]);
    }
}
const Darray = DarrayConstructor;
exports.default = Darray;
