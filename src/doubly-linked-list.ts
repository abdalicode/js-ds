class DoublyListNode {
  constructor(
    public value,
    public next: DoublyListNode | null = null,
    public previous: DoublyListNode | null = null
  ) {}
}

class DoublyLinkedList {
  constructor(
    public head: DoublyListNode | null = null,
    public tail: DoublyListNode | null = null,
    public length: number = 0
  ) {}

  push(value) {
    this.length += 1;
    let newNode = new DoublyListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return newNode;
  }

  pop() {
    if (!this.tail) return;
    this.length -= 1;
    const removedTail = this.tail;
    this.tail = this.tail.previous;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    return removedTail;
  }

  unshift(val) {
    this.length += 1;
    const newNode = new DoublyListNode(val, this.head);

    if (this.head) {
      this.head.previous = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    return newNode;
  }
  shift() {
    if (!this.head) return;
    this.length -= 1;
    const removeHead = this.head;
    this.head = this.head.next;

    if (this.head) {
      this.head.previous = null;
    } else {
      this.tail = null;
    }
    return removeHead;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return;
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }
    return currentNode;
  }

  set(index: number, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }

  insert(index: number, value) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this.length) {
      this.push(value);
      return true;
    }
    const previousNode = this.get(index - 1);
    if (!previousNode) return false;

    const newNode = new DoublyListNode(value, previousNode.next, previousNode);
    previousNode.next!.previous = newNode;
    previousNode.next = newNode;
    this.length += 1;
    return true;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const nodeToRemove = this.get(index);
    if (!nodeToRemove) return;

    nodeToRemove.previous!.next = nodeToRemove.next;
    nodeToRemove.next!.previous = nodeToRemove.previous;
    this.length -= 1;
    return nodeToRemove;
  }

  reverse() {
    let currentNode = this.head;
    let temp: DoublyListNode | null = null;

    while (currentNode) {
      temp = currentNode.previous;
      currentNode.previous = currentNode.next;
      currentNode.next = temp;
      currentNode = currentNode.previous;
    }

    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    return this;
  }
}
