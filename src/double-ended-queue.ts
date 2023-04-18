class DequeNode<T> {
  constructor(
    public value: T,
    public next: DequeNode<T> | null = null,
    public prev: DequeNode<T> | null = null
  ) {}
}

class Deque<T> {
  private head: DequeNode<T> | null = null;
  private tail: DequeNode<T> | null = null;
  private length: number = 0;

  pushFront(val: T) {
    const newNode = new DequeNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length += 1;
    return this;
  }

  pushBack(val: T) {
    const newNode = new DequeNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  popFront() {
    if (!this.head) return;
    const removedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedNode.next;
      this.head!.prev = null;
    }
    this.length -= 1;
    return removedNode.value;
  }

  popBack() {
    if (!this.head) return;
    const removedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removedNode!.prev;
      this.tail!.next = null;
    }
    this.length -= 1;
    return removedNode!.value;
  }
  get front() {
    return this.head?.value;
  }
  get back() {
    return this.tail?.value;
  }
  get isEmpty() {
    return this.length === 0;
  }
  get size() {
    return this.length;
  }
}
