import { SinglyLinkedList } from "./singly-linked-list";

class CircularLinkedList extends SinglyLinkedList {
  constructor(head = null, tail = null, length = 0) {
    super(head, tail, length);
  }
  push(val: any) {
    super.push(val);
    this.tail!.next = this.head;
    return this;
  }
}
