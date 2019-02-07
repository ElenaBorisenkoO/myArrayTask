var OwnArray = /** @class */ (function () {
    function OwnArray() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this.elementData = [];
        if (data.length === 1 && typeof data[0] === 'number') {
            this.elementData.length = data[0];
        }
        else {
            this.length = data.length;
            for (var i = 0; i < data.length; i++) {
                this.elementData[i] = data[i];
            }
        }
    }
    OwnArray.prototype.forEach = function (callback, thisArg) {
        if (thisArg === void 0) { thisArg = this; }
        for (var i = 0; i < this.length; i++) {
            callback(this.elementData[i], i, this);
        }
    };
    OwnArray.prototype.push = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var i = 0; i < data.length; i++) {
            var currentLength = this.length;
            this.elementData[currentLength] = data[i];
            this.length += 1;
        }
        return this.length;
    };
    OwnArray.prototype.pop = function () {
        var resultElement = this.elementData[this.elementData.length - 1];
        if (this.elementData.length !== 0) {
            var newElements = new OwnArray();
            for (var i = 0; i < this.elementData.length - 1; i++) {
                newElements.elementData[i] = this.elementData[i];
            }
            this.elementData.length -= 1;
        }
        return resultElement;
    };
    return OwnArray;
}());
var x = new OwnArray(1, 2, 3);
//x.forEach((thisArg:any,data:any,index:number,src:any):void => console.log(thisArg), x);
//x.forEach((elem) => console.log(elem));
// console.log(x.push(8,7,7,"geg"));
// console.log(x);
console.log(x.pop());
console.log(x);
