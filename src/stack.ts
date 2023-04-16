class StackNode {
  constructor(public value, public next: StackNode | null = null) {}
}

class StackList {
  constructor(
    public top: StackNode | null = null,
    private length: number = 0
  ) {}

  push(val) {
    const newNode = new StackNode(val);
    if (!this.top) {
      this.top = newNode;
    } else {
      newNode!.next = this.top;
      this.top = newNode;
    }
    this.length += 1;
  }

  pop() {
    if (!this.top) {
      return null;
    }
    const poppedNode = this.top;
    this.top = this.top.next;
    this.length -= 1;
    return poppedNode.value;
  }

  peak() {
    return this.top ? this.top.value : undefined;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get size() {
    return this.length;
  }
}
