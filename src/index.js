function MyArray(...rest) {
  this.length = null;

  if (rest.length === 1 && typeof rest[0] === 'number') {
    this.length = rest[0];
  } else {
    this.length = rest.length;

    for (let i = 0; i < rest.length; i++) {
      this[i] = rest[i];
    }
  }
}

MyArray.prototype.push = function(...rest) {
  if (rest.length !== 0) {
    const len = rest.length;

    for (let i = 0; i < len; i++) {
      const currentLen = this.length;
      this[currentLen] = rest[i];
      this.length += 1;
    }
  }
  return this.length;
};

MyArray.prototype.pop = function() {
  const x = this[this.length - 1];
  const newElements = new MyArray();

  if (this.length !== 0) {
    for (let i = 0; i < this.length - 1; i++) {
      newElements[i] = this[i];
    }
    this.length -= 1;
  }
  return x;
};

MyArray.prototype.forEach = function(callback, thisArg = this) {
  if (typeof callback !== 'function') {
    throw new TypeError();
  }

  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};

MyArray.prototype.map = function(callback, thisArg = this) {
  if (typeof callback !== 'function') {
    throw new TypeError();
  }

  const resultArr = new MyArray();

  for (let i = 0; i < this.length; i++) {
    const mapElement = callback.call(thisArg, this[i], i, this);

    resultArr[i] = mapElement;
    resultArr.length += 1;
  }

  return resultArr;
};

MyArray.prototype.toString = function() {
  let resultString = '';

  for (let i = 0; i < this.length; i++) {
    if (i !== this.length - 1) {
      resultString += `${this[i]}${','}`;
    } else {
      resultString += this[i];
    }
  }

  return resultString;
};

MyArray.prototype.filter = function(callback, thisArg) {
  const filterElements = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      filterElements.push(this[i]);
    }
  }
  return filterElements;
};

MyArray.prototype.reduce = function(...rest) {
  if (typeof rest[0] !== 'function') {
    throw new TypeError('Callback is not a function');
  }

  if (this === undefined) {
    return undefined;
  }

  if (this.length === 0) {
    if (rest[1] === undefined) {
      throw new TypeError('Initialvalue is not defined');
    } else {
      return rest[1];
    }
  }

  let accumulator = rest[1] !== undefined ? rest[1] : this[0];

  let start = 1;

  if (rest[1] !== undefined) {
    start = 0;
  } else {
    start = 1;
  }

  for (let i = start; i < this.length; i++) {
    accumulator = rest[0](accumulator, this[i], i, this);
  }
  return accumulator;
};

MyArray.from = function(elements, mapFunction, thisArg = this) {
  if (elements === undefined || elements === null) {
    throw new Error('first argument not defined');
  }

  if (!(typeof elements[Symbol.iterator] === 'function')) {
    throw new Error('arrayLike element is not iterable');
  }

  const applyMapFunction = (mapFunction !== undefined && typeof mapFunction === 'function');

  const newInstance = new MyArray();

  for (let i = 0; i < elements.length; i++) {
    newInstance[i] = applyMapFunction ? mapFunction.call(thisArg, elements[i], i, elements) : elements[i];
    newInstance.length += 1;
  }
  return newInstance;
};

MyArray.prototype.sort = function(comparator) {
  let comp = function(a, b) {
    if (a === undefined || b === undefined) {
      if (a === undefined)
      { return 1; }

      if (b === undefined)
      { return -1; }
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

  if (comparator !== undefined) {
    if (typeof comparator !== 'function') {
      throw new TypeError();
    } else {
      comp = comparator;
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

MyArray.prototype[Symbol.iterator] = function() {
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
};

MyArray.prototype.find = function(callback, thisArg = this) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback is not a fuction');
  }

  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this) === true) {
      return this[i];
    }
  }
  return undefined;
};

MyArray.prototype.slice = function(begin, end) {
  const slicedArray = new MyArray();

  let firstSlicedElem = begin ? begin : 0;
  let lastSlicedElem = end ? end : this.length;

  if (begin < 0) {
    firstSlicedElem = this.length + begin;
  }

  if (end < 0) {
    lastSlicedElem = this.length + end;
  }


  for (let i = firstSlicedElem; i < lastSlicedElem; i++ ) {
    slicedArray.push(this[i]);
  }

  return slicedArray;
};


export default MyArray;