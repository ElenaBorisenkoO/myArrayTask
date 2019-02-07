"use strict";
exports.__esModule = true;
var MyArray = /** @class */ (function () {
    function MyArray() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (data.length === 1 && typeof data[0] === 'number') {
            this.length = data[0];
        }
        else {
            this.length = data.length;
            for (var i = 0; i < data.length; i++) {
                this[i] = data[i];
            }
        }
    }
    MyArray.prototype.forEach = function (callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
    MyArray.prototype.push = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var i = 0; i < data.length; i++) {
            var currentLength = this.length;
            this[currentLength] = data[i];
            this.length += 1;
        }
        return this.length;
    };
    MyArray.prototype.pop = function () {
        var resultElement = this[this.length - 1];
        if (this.length !== 0) {
            var newElements = new MyArray();
            for (var i = 0; i < this.length - 1; i++) {
                newElements[i] = this[i];
            }
            this.length -= 1;
        }
        return resultElement;
    };
    MyArray.prototype.map = function (callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError('Carefully! Callback is not a function!');
        }
        var resultArr = new MyArray();
        for (var i = 0; i < this.length; i++) {
            var mapElement = callback.call(thisArg, this[i], i, this);
            resultArr[i] = mapElement;
            resultArr.length += 1;
        }
        return resultArr;
    };
    MyArray.prototype.toString = function () {
        var resultString = '';
        if (this.length > 0) {
            for (var i = 0; i < this.length - 1; i++) {
                resultString += this[i] + ",";
            }
            resultString += "" + this[this.length - 1];
        }
        return resultString;
    };
    MyArray.prototype.filter = function (callback, thisArg) {
        var filterElements = new MyArray();
        for (var i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                filterElements[filterElements.length] = this[i];
                filterElements.length += 1;
            }
        }
        return filterElements;
    };
    MyArray.prototype.reduce = function (callback, initialValue) {
        if (this.length === 0 && !initialValue) {
            throw new TypeError('MyArray.prototype.reduce called on null or undefined');
        }
        if (this.length === 0 && initialValue) {
            return initialValue;
        }
        var accumulator = initialValue === undefined ? this[0] : callback(initialValue, this[0], 0, this);
        for (var i = 1; i < this.length; i++) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    };
    MyArray.prototype.sort = function (compareFn) {
        var comp = function (a, b) {
            if (a === undefined) {
                return 1;
            }
            if (b === undefined) {
                return -1;
            }
            var aString = a.toString();
            var bString = b.toString();
            if (aString === bString) {
                return 0;
            }
            else if (aString < bString) {
                return -1;
            }
            else {
                return 1;
            }
        };
        if (compareFn !== undefined) {
            if (typeof compareFn !== 'function') {
                throw new TypeError();
            }
            else {
                comp = compareFn;
            }
        }
        var barrier = this.length - 1;
        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < barrier; j++) {
                var result = comp(this[j], this[j + 1]);
                if (result > 0) {
                    var temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
            }
            barrier -= 1;
        }
        return this;
    };
    ;
    MyArray.prototype.find = function (callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError('Callback is not a fuction');
        }
        for (var i = 0; i < this.length; i++) {
            if (callback.call(thisArg, this[i], i, this)) {
                return this[i];
            }
        }
        return undefined;
    };
    MyArray.prototype.slice = function (begin, end) {
        var slicedArray = new MyArray();
        var from = 0;
        var to = this.length;
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
        for (var i = from; i < to; i++) {
            slicedArray.push(this[i]);
        }
        return slicedArray;
    };
    ;
    MyArray.from = function (arrayLike, mapFunction, thisArg) {
        if (arrayLike === undefined || arrayLike === null) {
            throw new Error('first argument not defined');
        }
        var applyMapFunction = (mapFunction !== undefined && typeof mapFunction === 'function');
        var newInstance = new MyArray();
        for (var i = 0; i < arrayLike.length; i++) {
            newInstance[i] = applyMapFunction ? mapFunction.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
            newInstance.length += 1;
        }
        return newInstance;
    };
    MyArray.prototype[Symbol.iterator] = function () {
        var current = 0;
        var that = this;
        return {
            next: function () {
                if (current < that.length) {
                    current += 1;
                    return {
                        value: that[current - 1],
                        done: false
                    };
                }
                else {
                    return {
                        done: true
                    };
                }
            }
        };
    };
    return MyArray;
}());
exports["default"] = MyArray;
// let t = new Array();
// t.map
// let x = new MyArray(1, 2, 3);
// //x.forEach((thisArg:any,data:any,index:number,src:any):void => console.log(thisArg), x);
// //x.forEach((elem) => console.log(elem));
// // console.log(x.push(8,7,7,"geg"));
// // console.log(x);
// console.log(x.pop());
// console.log(x);
