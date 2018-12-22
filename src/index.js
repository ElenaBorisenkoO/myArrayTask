function MyArray(...rest) {
  this.elements = [];

  for (let i = 0; i < arguments.length; i++) {
    this.elements[i] = rest[i];
  }
}

MyArray.prototype.push = function(...rest) {
  if (arguments.length !== 0) {
    const len = this.elements.length;

    for (let i = 0; i < arguments.length; i++) {
      this.elements[len + i] = rest[i];
    }
  }
  return this.elements.length;
};

MyArray.prototype.pop = function() {
  let x = this.elements[this.elements.length - 1];

  if (this.elements.length !== 0) {
    x = this.elements[this.elements.length - 1];

    const newelements = [];

    for (let i = 0; i < this.elements.length - 1; i++) {
      newelements[i] = this.elements[i];
    }
    this.elements = newelements;
  }
  return x;
};

MyArray.prototype.forEach = function(...rest) {
  if (arguments.length !== 0 && (typeof rest[0] === 'function')) {
    for (let i = 0; i < this.elements.length; i++) {
      rest[0](this.elements[i], i, this.elements);
    }
  }
};

MyArray.prototype.map = function(...rest) {
  const resultArr = [];

  if (arguments.length !== 0 && (typeof rest[0] === 'function')) {
    for (let i = 0; i < this.elements.length; i++) {
      rest[0](this.elements[i], i, this.elements);
      resultArr[i] = this.elements[i];
    }
  }

  return resultArr;
};

MyArray.prototype.toString = function() {
  let resultString = ' ';

  for (let i = 0; i < this.elements.length; i++) {
    resultString += this.elements[i];
  }

  return resultString;
};

MyArray.prototype.filter = function(...rest) {
  const filterElements = [];

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

MyArray.from = function(elements, mapFunction) {
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