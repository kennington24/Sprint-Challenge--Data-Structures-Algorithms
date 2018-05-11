const heapsort = arr => {
  var count = arr.length;
  arr.unshift(null);

  for (var i = count >> 1; i > 0; i--) {
    down(arr, i, count);
  }

  for (var i = count; i > 0; i--) {
    var tmp = arr[i];
    arr[i] = arr[1];
    arr[1] = tmp;

    down(arr, 1, --count);
  }

  arr.shift();
  return arr;
};

function down(items, parent, count) {
  var child = parent << 1;
  while (child <= count) {
    if (child < count) {
      child = items[child] > items[child + 1] ? child : child + 1;
    }

    if (items[parent] > items[child]) break;

    var tmp = items[parent];
    items[parent] = items[child];
    items[child] = tmp;

    parent = child;
    child = parent << 1;
  }
}

class Heap {
  constructor() {
    this.storage = [null];
    this.size = 0;
  }

  insert(val) {
    const index = this.storage.push(val) - 1;
    this.size++;
    this.bubbleUp(index);
  }

  delete() {
    if (this.storage.length === 2) {
      this.size--;
      return this.storage.pop();
    } else if (this.storage.length === 1) {
      return this.storage[0];
    }
    this.size--;
    const max = this.storage[1];
    this.storage[1] = this.storage.pop();
    this.siftDown(1);
    return max;
  }

  getMax() {
    return this.storage[1];
  }

  getSize() {
    return this.size;
  }

  bubbleUp(index) {
    const parent = Math.floor(index / 2);
    if (parent > 0 && this.storage[parent] < this.storage[index]) {
      [this.storage[parent], this.storage[index]] = [
        this.storage[index],
        this.storage[parent]
      ];
      this.bubbleUp(parent);
    }
  }

  siftDown(index) {
    const child1 = index * 2;
    const child2 = index * 2 + 1;
    let maxChild;

    if (this.storage[child1] !== undefined) {
      if (this.storage[child2] === undefined) {
        maxChild = child1;
      } else if (this.storage[child2] !== undefined) {
        maxChild =
          this.storage[child1] > this.storage[child2] ? child1 : child2;
      }

      if (this.storage[index] < this.storage[maxChild]) {
        [this.storage[maxChild], this.storage[index]] = [
          this.storage[index],
          this.storage[maxChild]
        ];
        this.siftDown(maxChild);
      }
    }
  }
}

module.exports = {
  Heap,
  heapsort
};
