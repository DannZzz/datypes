export interface constructor {
    new(): Chest<unknown, unknown>;
    new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): Chest<K, V>;
    new <K, V>(iterable: Iterable<readonly [K, V]>): Chest<K, V>;
    readonly prototype: Chest<unknown, unknown>;
    readonly [Symbol.species]: constructor;
}

export interface Chest<K, V> extends Map<K, V> {
    constructor: constructor;
}

export type ReadOnlyChest<K, V> = ReadonlyMap<K, V> &
    Omit<Chest<K, V>, 'forEach' | 'ensure' | 'reverse' | 'sweep' | 'sort' | 'get' | 'set' | 'delete'>;

export class Chest<K, V> extends Map<K, V> {
    public static readonly default: typeof Chest = Chest;

    /**
     * Checks if all of the elements exist in the chest.
     *
     * @param keys - The keys of the elements to check for
     *
     * @returns `true` if all of the elements exist, `false` if at least one does not exist.
     */
    public hasAll(...keys: K[]) {
        return keys.every((k) => super.has(k));
    }

    /**
     * Checks if any of the elements exist in the chest.
     *
     * @param keys - The keys of the elements to check for
     *
     * @returns `true` if any of the elements exist, `false` if none exist.
     */
    public hasAny(...keys: K[]) {
        return keys.some((k) => super.has(k));
    }

    /**
     * Obtains the first value(s) in this chest.
     *
     * @param amount Amount of values to obtain from the beginning
     *
     * @returns A single value if no amount is provided or an array of values, starting from the end if amount is negative
     */
    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {
        if (typeof amount === 'undefined') return this.values().next().value;
        if (amount < 0) return this.last(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.values();
        return Array.from({ length: amount }, (): V => iter.next().value);
    }

    /**
     * Obtains the first key(s) in this chest.
     *
     * @param amount Amount of keys to obtain from the beginning
     *
     * @returns A single key if no amount is provided or an array of keys, starting from the end if
     * amount is negative
     */
    public firstKey(): K | undefined;
    public firstKey(amount: number): K[];
    public firstKey(amount?: number): K | K[] | undefined {
        if (typeof amount === 'undefined') return this.keys().next().value;
        if (amount < 0) return this.lastKey(amount * -1);
        amount = Math.min(this.size, amount);
        const iter = this.keys();
        return Array.from({ length: amount }, (): K => iter.next().value);
    }

    /**
     * Obtains the last value(s) in this chest.
     *
     * @param amount Amount of values to obtain from the end
     *
     * @returns A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    public last(): V | undefined;
    public last(amount: number): V[];
    public last(amount?: number): V | V[] | undefined {
        const arr = [...this.values()];
        if (typeof amount === 'undefined') return arr[arr.length - 1];
        if (amount < 0) return this.first(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    /**
     * Obtains the last key(s) in this chest.
     *
     * @param amount Amount of keys to obtain from the end
     *
     * @returns A single key if no amount is provided or an array of keys, starting from the start if
     * amount is negative
     */
    public lastKey(): K | undefined;
    public lastKey(amount: number): K[];
    public lastKey(amount?: number): K | K[] | undefined {
        const arr = [...this.keys()];
        if (typeof amount === 'undefined') return arr[arr.length - 1];
        if (amount < 0) return this.firstKey(amount * -1);
        if (!amount) return [];
        return arr.slice(-amount);
    }

    /**
     * Identical to [Array.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at).
     * Returns the item at a given index, allowing for positive and negative integers.
     * Negative integers count back from the last item in the chest.
     *
     * @param index The index of the element to obtain
     */
    public at(index: number) {
        index = Math.floor(index);
        const arr = [...this.values()];
        return arr.at(index);
    }

    /**
     * Identical to [Array.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at).
     * Returns the key at a given index, allowing for positive and negative integers.
     * Negative integers count back from the last item in the chest.
     *
     * @param index The index of the key to obtain
     */
    public keyAt(index: number) {
        index = Math.floor(index);
        const arr = [...this.keys()];
        return arr.at(index);
    }

    /**
     * Obtains unique random value(s) from this chest.
     *
     * @param amount Amount of values to obtain randomly
     *
     * @returns A single value if no amount is provided or an array of values
     */
    public random(): V | undefined;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] | undefined {
        const arr = [...this.values()];
        if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)];
        if (!arr.length || !amount) return [];
        return Array.from(
            { length: Math.min(amount, arr.length) },
            (): V => arr.splice(Math.floor(Math.random() * arr.length), 1)[0],
        );
    }

    /**
     * Identical to [Array.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
     * but returns a Chest instead of an Array.
     */
    public reverse() {
        const entries = [...this.entries()].reverse();
        this.clear();
        for (const [key, value] of entries) this.set(key, value);
        return this;
    }

    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     *
     * @param fn The function to test with (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.find(user => user.username === 'Bob');
     */
    public find<V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2): V2 | undefined;
    public find(fn: (value: V, key: K, chest: this) => boolean): V | undefined;
    public find<This, V2 extends V>(
        fn: (this: This, value: V, key: K, chest: this) => value is V2,
        thisArg: This,
    ): V2 | undefined;
    public find<This>(fn: (this: This, value: V, key: K, chest: this) => boolean, thisArg: This): V | undefined;
    public find(fn: (value: V, key: K, chest: this) => boolean, thisArg?: unknown): V | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return val;
        }
        return undefined;
    }

    /**
     * Get the value of element, or create a new element if it doesn't exist.
     * 
     * @param key The key of the element to check for
     * @param newValue An additional value if you need to create a new element
     * @returns The value of element (created) or `undefined`
     * 
     * @example
     * chest.getOrCreate("14484418947");
     * chest.getOrCreate("14484418947", {name: "Nick", lastName: "Smith"});
     */
    public getOrCreate(key: K, newValue?: V): V | undefined {
        if (this.has(key)) return this.get(key);
        if (newValue === undefined) {
            return undefined
        }
        this.set(key, newValue);
        return this.get(key);
    }

    /**
     * Delets all right elements after executing the function
     * 
     * @param fn The function to test (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     * 
     * @example
     * chest.deleteMany(user => user.items.length > 5);
     */
    public deleteMany<V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2): void;
    public deleteMany(fn: (value: V, key: K, chest: this) => boolean): void;
    public deleteMany<This, V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2, thisArg?: This): void;
    public deleteMany<This>(fn: (value: V, key: K, chest: this) => boolean, thisArg?: This): void;
    public deleteMany(fn: (value: V, key: K, chest: this) => boolean, thisArg?: this): void {
        if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
        for (const [key, value] of this) {
            if (fn(value, key, this)) this.delete(key);
        }
    }

    /**
     * Searches all the right elements and gives them a new value.
     * 
     * @param fn The function to test (should return boolean)
     * @param newValue New value for the elements
     * @param thisArg Value to use as `this` when executing function
     * 
     * @example
     * chest.setMany(balance => balance < 0, 100)
     */
    public setMany<V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2, newValue: V2): void;
    public setMany(fn: (value: V, key: K, chest: this) => boolean, newValue: V): void;
    public setMany<This, V2 extends V>(
        fn: (this: This, value: V, key: K, chest: this) => value is V2,
        newValue: V2,
        thisArg: This,
    ): void;
    public setMany<This>(fn: (this: This, value: V, key: K, chest: this) => boolean, newValue: V, thisArg: This): void;
    public setMany(fn: (value: V, key: K, chest: this) => boolean, newValue: V, thisArg?: unknown): void {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [key, value] of this) {
            if (fn(value, key, this)) this.set(key, newValue);
        }
    }
    
    /**
     * Searches for the key of a single item where the given function returns a truthy value. This behaves like
     * [Array.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex),
     * but returns the key rather than the positional index.
     *
     * @param fn The function to test with (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.findKey(user => user.username === 'Nick');
     */
    public findKey<K2 extends K>(fn: (value: V, key: K, chest: this) => key is K2): K2 | undefined;
    public findKey(fn: (value: V, key: K, chest: this) => boolean): K | undefined;
    public findKey<This, K2 extends K>(
        fn: (this: This, value: V, key: K, chest: this) => key is K2,
        thisArg: This,
    ): K2 | undefined;
    public findKey<This>(fn: (this: This, value: V, key: K, chest: this) => boolean, thisArg: This): K | undefined;
    public findKey(fn: (value: V, key: K, chest: this) => boolean, thisArg?: unknown): K | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return key;
        }
        return undefined;
    }

    /**
     * Removes all the specified elements if they are exist.
     * 
     * @param keys The keys of the elements to check for
     * 
     * @example
     * chest.removeAll(user1.id, user4.id)
     */
    public removeAll(...keys: K[]): void {
        this.deleteMany((v, key) => keys.includes(key));
    }

    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a Chest instead of an Array.
     *
     * @param fn The function to test with (should return boolean)
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.filter(user => user.username === 'Bob');
     */
    public filter<K2 extends K>(fn: (value: V, key: K, chest: this) => key is K2): Chest<K2, V>;
    public filter<V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2): Chest<K, V2>;
    public filter(fn: (value: V, key: K, chest: this) => boolean): Chest<K, V>;
    public filter<This, K2 extends K>(
        fn: (this: This, value: V, key: K, chest: this) => key is K2,
        thisArg: This,
    ): Chest<K2, V>;
    public filter<This, V2 extends V>(
        fn: (this: This, value: V, key: K, chest: this) => value is V2,
        thisArg: This,
    ): Chest<K, V2>;
    public filter<This>(fn: (this: This, value: V, key: K, chest: this) => boolean, thisArg: This): Chest<K, V>;
    public filter(fn: (value: V, key: K, chest: this) => boolean, thisArg?: unknown): Chest<K, V> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const results = new this.constructor[Symbol.species]<K, V>();
        for (const [key, val] of this) {
            if (fn(val, key, this)) results.set(key, val);
        }
        return results;
    }

    /**
     * Maps each item to another value into an array. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     *
     * @param fn Function that produces an element of the new array, taking three arguments
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.map(user => user.tag);
     */
    public map<T>(fn: (value: V, key: K, chest: this) => T): T[];
    public map<This, T>(fn: (this: This, value: V, key: K, chest: this) => T, thisArg: This): T[];
    public map<T>(fn: (value: V, key: K, chest: this) => T, thisArg?: unknown): T[] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const iter = this.entries();
        return Array.from({ length: this.size }, (): T => {
            const [key, value] = iter.next().value;
            return fn(value, key, this);
        });
    }

    /**
     * Combines this chest with others into a new chest. None of the source chests are modified.
     *
     * @param chests chests to merge
     *
     * @example
     * const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
     */
    public concat(...chests: ReadOnlyChest<K, V>[]) {
        const newColl = this.clone();
        for (const coll of chests) {
            for (const [key, val] of coll) newColl.set(key, val);
        }
        return newColl;
    }

    /**
     * Maps each item to another value into a chest. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     *
     * @param fn Function that produces an element of the new chest, taking three arguments
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.mapValues(user => user.tag);
     */
    public mapValues<T>(fn: (value: V, key: K, chest: this) => T): Chest<K, T>;
    public mapValues<This, T>(fn: (this: This, value: V, key: K, chest: this) => T, thisArg: This): Chest<K, T>;
    public mapValues<T>(fn: (value: V, key: K, chest: this) => T, thisArg?: unknown): Chest<K, T> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const coll = new this.constructor[Symbol.species]<K, T>();
        for (const [key, val] of this) coll.set(key, fn(val, key, this));
        return coll;
    }

    /**
     * Checks if there exists an item that passes a test. Identical in behavior to
     * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
     *
     * @param fn Function used to test (should return a boolean)
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.some(user => user.discriminator === '0000');
     */
    public some(fn: (value: V, key: K, chest: this) => boolean): boolean;
    public some<T>(fn: (this: T, value: V, key: K, chest: this) => boolean, thisArg: T): boolean;
    public some(fn: (value: V, key: K, chest: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (fn(val, key, this)) return true;
        }
        return false;
    }

    /**
     * Checks if all items passes a test. Identical in behavior to
     * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
     *
     * @param fn Function used to test (should return a boolean)
     * @param thisArg Value to use as `this` when executing function
     *
     * @example
     * chest.every(user => !user.bot);
     */
    public every<K2 extends K>(fn: (value: V, key: K, chest: this) => key is K2): this is Chest<K2, V>;
    public every<V2 extends V>(fn: (value: V, key: K, chest: this) => value is V2): this is Chest<K, V2>;
    public every(fn: (value: V, key: K, chest: this) => boolean): boolean;
    public every<This, K2 extends K>(
        fn: (this: This, value: V, key: K, chest: this) => key is K2,
        thisArg: This,
    ): this is Chest<K2, V>;
    public every<This, V2 extends V>(
        fn: (this: This, value: V, key: K, chest: this) => value is V2,
        thisArg: This,
    ): this is Chest<K, V2>;
    public every<This>(fn: (this: This, value: V, key: K, chest: this) => boolean, thisArg: This): boolean;
    public every(fn: (value: V, key: K, chest: this) => boolean, thisArg?: unknown): boolean {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const [key, val] of this) {
            if (!fn(val, key, this)) return false;
        }
        return true;
    }

    /**
     * Creates an identical shallow copy of this chest.
     *
     * @example
     * const newColl = someColl.clone();
     */
    public clone(): Chest<K, V> {
        return new this.constructor[Symbol.species](this);
    }

    /**
     * The sort method sorts the items of a chest in place and returns it.
     * The sort is not necessarily stable in Node 10 or older.
     * The default sort order is according to string Unicode code points.
     *
     * @param compareFunction Specifies a function that defines the sort order.
     * If omitted, the chest is sorted according to each character's Unicode code point value, according to the string conversion of each element.
     *
     * @example
     * chest.sort((userA, userB) => userA.createdTimestamp - userB.createdTimestamp);
     */
    public sort(compareFunction: Comparator<K, V> = Chest.defaultSort) {
        const entries = [...this.entries()];
        entries.sort((a, b): number => compareFunction(a[1], b[1], a[0], b[0]));

        super.clear();

        for (const [k, v] of entries) {
            super.set(k, v);
        }
        return this;
    }

    public toJSON() {
        return [...this.values()];
    }

    private static defaultSort<V>(firstValue: V, secondValue: V): number {
        return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
    }

}

export type Comparator<K, V> = (firstValue: V, secondValue: V, firstKey: K, secondKey: K) => number;

export default Chest;