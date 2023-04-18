class SimpleQueueNode {
  constructor(
    public value = null,
    public next: SimpleQueueNode | null = null
  ) {}
}

class SimpleQueue {
  constructor(
    public head: SimpleQueueNode | null = null,
    public tail: SimpleQueueNode | null = null,
    public length: number = 0
  ) {}

  add(value) {
    const newNode = new SimpleQueueNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  remove() {
    if (this.isEmpty) return;
    const removedNode = this.head;
    this.head = this.head!.next;
    this.length -= 1;
    if (!this.head) {
      this.tail = null;
    }
    return removedNode?.value;
  }

  get isEmpty() {
    return this.length === 0;
  }
}
