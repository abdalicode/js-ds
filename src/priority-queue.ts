class PriorityQueueNode {
  constructor(
    public value = null,
    public priority: number,
    public next: PriorityQueueNode | null = null
  ) {}
}

class PriorityQueue {
  constructor(
    public head: PriorityQueueNode | null = null,
    public tail: PriorityQueueNode | null = null,
    public length: number = 0
  ) {}

  add(value, priority) {
    const newNode = new PriorityQueueNode(value, priority);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else if (newNode.priority < this.head.priority) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (
        currentNode.next &&
        currentNode.next.priority <= newNode.priority
      ) {
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
      if (!newNode.next) {
        this.tail = newNode;
      }
    }
    this.length += 1;
  }

  removeHead() {
    if (!this.head) {
      return undefined;
    }
    const removedNode = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.length -= 1;
  }

  reverse() {
    let previous: PriorityQueueNode | null = null;
    let current: PriorityQueueNode | null = this.head;
    let next: PriorityQueueNode | null = null;

    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }
    this.tail = this.head;
    this.head = previous;
  }
}
