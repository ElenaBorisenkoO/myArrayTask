interface IMyArray<T> {
    length: number;
    [key: number]: T;
    push(...data: any[]): number;
    pop(): T;
    forEach(callback: (array: IMyArray<T>, index: number, elem: T) => any, thisArg?: any): void;
    map<U>(callback: (array: IMyArray<T>, index: number, elem: T) => U, thisArg?: any): IMyArray<U>;
    toString(): string;
    filter(callback: (elem: T, index: number, array: IMyArray<T>) => any, thisArg?: any): IMyArray<T>;
    reduce<R>(callback: (previousValue: T, currentValue: T, currentIndex: number, array: IMyArray<T>) => R, initialValue?: any): R;
    sort(compareFn?: (a: number, b: number) => number): this;
    find(callback: (elem: T, index: number, obj: IMyArray<T>) => boolean, thisArg?: any): T | undefined;
    slice(start?: number, end?: number): IMyArray<T>;
};

interface IArrayLike<T> {
    length: number;
    [n: number]: T;
};

class MyArray<T> implements IMyArray<T>{
    length: number;
    [key: number]: T;
    constructor(...data: T[] | [number]) {
        if (data.length === 1 && typeof data[0] === 'number') {
            this.length = data[0];
        } else {
            this.length = data.length;
            for (let i = 0; i < data.length; i++) {
                this[i] = data[i] as T;
            }
        }
    };

    forEach(callback: (array?: MyArray<T>, index?: number, elem?: T) => any, thisArg?: any): void {
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };

    push(...data: any[]): number {
        for (let i = 0; i < data.length; i++) {
            const currentLength = this.length;
            this[currentLength] = data[i];
            this.length += 1;
        }
        return this.length;
    };

    pop(): T | undefined {
        const resultElement = this[this.length - 1];

        if (this.length !== 0) {
            let newElements = new MyArray<T>();

            for (let i = 0; i < this.length - 1; i++) {
                newElements[i] = this[i];
            }
            this.length -= 1;
        }
        return resultElement;
    };

    map<U>(callback: (array?: MyArray<T>, index?: number, elem?: T) => U, thisArg?: any): MyArray<U> {
        if (typeof callback !== 'function') {
            throw new TypeError('Carefully! Callback is not a function!');
        }

        const resultArr = new MyArray<U>();

        for (let i = 0; i < this.length; i++) {
            const mapElement = callback.call(thisArg, this[i], i, this);

            resultArr[i] = mapElement;
            resultArr.length += 1;
        }

        return resultArr;
    };

    toString(): string {
        let resultString = '';

        if (this.length > 0) {
            for (let i = 0; i < this.length - 1; i++) {
                resultString += `${this[i]},`;
            }
            resultString += `${this[this.length - 1]}`;
        }

        return resultString;
    };

    filter(callback: (elem?: T, index?: number, array?: IMyArray<T>) => any, thisArg?: any): MyArray<T> {
        const filterElements = new MyArray<T>();
        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                filterElements[filterElements.length] = this[i];
                filterElements.length += 1;
            }
        }

        return filterElements;
    };

    reduce<R>(callback: (previousValue: T, currentValue: T, currentIndex: number, array: IMyArray<T>) => R, initialValue?: any): R {
        if (this.length === 0 && !initialValue) {
            throw new TypeError('MyArray.prototype.reduce called on null or undefined');
        }

        if (this.length === 0 && initialValue) {
            return initialValue;
        }

        let accumulator = initialValue === undefined ? this[0] : callback(initialValue, this[0], 0, this);

        for (let i = 1; i < this.length; i++) {
            accumulator = callback(accumulator as T, this[i], i, this);
        }

        return accumulator as R;
    };

    sort(compareFn?: (a: number, b: number) => number): this {
        let comp = function (a: any, b: any): number {
            if (a === undefined) {
                return 1;
            }

            if (b === undefined) {
                return -1;
            }

            const aString = a.toString();
            const bString = b.toString();

            if (aString === bString) {
                return 0;
            } else if (aString < bString) {
                return -1;
            } else {
                return 1;
            }
        };

        if (compareFn !== undefined) {
            if (typeof compareFn !== 'function') {
                throw new TypeError();
            } else {
                comp = compareFn;
            }
        }

        let barrier = this.length - 1;

        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < barrier; j++) {
                const result = comp(this[j], this[j + 1]);

                if (result > 0) {
                    const temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
            }
            barrier -= 1;
        }
        return this;
    };

    find(callback: (elem: T, index: number, obj: IMyArray<T>) => boolean, thisArg?: any): T | undefined {
        if (typeof callback !== 'function') {
            throw new TypeError('Callback is not a fuction');
        }

        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };

    slice(begin?: number, end?: number): MyArray<T> {
        const slicedArray = new MyArray<T>();

        let from = 0;
        let to = this.length;

        if (begin > this.length) {
            return slicedArray;
        }

        if (begin > 0) {
            from = begin;
        }

        if (begin < 0 && Math.abs(begin) < this.length) {
            from = this.length + begin;
        }

        if (end < 0) {
            to = this.length + end;
        }

        if (end >= 0 && end <= this.length) {
            to = end;
        }

        for (let i = from; i < to; i++) {
            slicedArray.push(this[i]);
        }

        return slicedArray;
    };

    static from<T>(arrayLike: IArrayLike<T>): MyArray<T>;
    static from<T, R>(arrayLike: IArrayLike<T>, mapFn: (value: T, index: number) => R, thisArg: any): MyArray<R>;

    static from<T, R>(arrayLike: IArrayLike<T>, mapFunction?: (value: T, index: number) => R, thisArg?: any): MyArray<T> | MyArray<R>{
        if (arrayLike === undefined || arrayLike === null) {
            throw new Error('first argument not defined');
        }

        const applyMapFunction = (mapFunction !== undefined && typeof mapFunction === 'function');
        const newInstance: MyArray<R> | MyArray<T>= new MyArray();

        for (let i = 0; i < arrayLike.length; i++) {
            newInstance[i] = applyMapFunction ? mapFunction.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
            newInstance.length += 1;
        }
        return newInstance;
    };


    [Symbol.iterator]() {
        let current = 0;
        const that = this;

        return {
            next() {
                if (current < that.length) {
                    current += 1;
                    return {
                        value: that[current - 1],
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
};
export default MyArray;
