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
        for (var i = 0; i < this.length; i++) {
            callback(thisArg, this.elementData[i], i, this);
        }
    };
    return OwnArray;
}());
var x = new OwnArray(1, 2, 3);
//x.forEach((thisArg:any,data:any,index:number,src:any):void => console.log(thisArg), x);
x.forEach(function (thisArg, data, index, src) { return console.log(data); });
