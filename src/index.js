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

MyArray.prototype.filter = function(...rest) {
  const filterElements = new MyArray();

  if (arguments.length !== 0 && (typeof rest[0] === 'function')) {
    for (let i = 0; i < this.elements.length; i++) {
      if (rest[0](this.elements[i], i, this.elements)) {
        filterElements[i] = this.elements[i];
      }
    }
  }
  return filterElements;
};

MyArray.prototype.reduce = function(...rest) {
  if (this.elements === undefined) {
    return undefined;
  }

  if (this.elements.length === 0) {
    return undefined;
  }

  let accumulator = rest[1];

  if (arguments.length !== 0 && (typeof rest[0] === 'function')) {
    let start = 0;

    if (rest[1] !== undefined) {
      accumulator = rest[1];
      start = 0;
    } else {
      const dv = typeof this.elements[0] === 'object' ? '' : 0;
      accumulator = rest[0](dv, this.elements[0], 0, this.elements);
      start = 1;
    }

    for (let i = start; i < this.elements.length; i++) {
      accumulator = rest[0](accumulator, this.elements[i], i, this.elements);
    }
  }
  return accumulator;
};

const reducer = (acc, item) => acc + item;

MyArray.prototype.from = function(elements, mapFunction) {
  if (elements === undefined || elements === null) {
    throw new Error('first argument not defined');
  }

  if (!(typeof elements[Symbol.iterator] === 'function')) {
    throw new Error('arrayLike element is not iterable');
  }

  const applyMapFunction = (mapFunction !== undefined && typeof mapFunction === 'function');

  const newInstance = new MyArray();

  for (let i = 0; i < elements.length; i++) {
    newInstance[i] = applyMapFunction ? mapFunction(elements[i]) : elements[i];
  }
  return newInstance;
};

MyArray.prototype.sort = function(comparator) {
  let comp = comparator;
  function defaultComparator(a, b) {
    const aString = a.toString();
    const bString = b.toString();

    if (aString === bString) {
      return 0;
    } else if (aString < bString) {
      return -1;
    } else {
      return 1;
    }
  }

  if (!(comp !== undefined && typeof comp === 'function')) {
    comp = defaultComparator;
  }

  let barrier = this.elements.length - 1;

  for (let i = 0; i < this.elements.length; i++) {
    for (let j = 0; j < barrier; j++) {
      const result = comp(this.elements[j], this.elements[j + 1]);

      if (result > 0) {
        const temp = this.elements[j];
        this.elements[j] = this.elements[j + 1];
        this.elements[j + 1] = temp;
      }
    }
    barrier -= 1;
  }
  return this.elements;
};
export default MyArray;