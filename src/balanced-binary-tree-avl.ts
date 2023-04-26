class AVLNode<T> {
  constructor(
    public value: T,
    public height: number = 1,
    public left: AVLNode<T> | null = null,
    public right: AVLNode<T> | null = null
  ) {}
}

class AVLTree<T> {
  constructor(public root: AVLNode<T> | null = null) {}

  private height(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private balanceFactor(node: AVLNode<T> | null): number {
    return this.height(node!.left) - this.height(node!.right);
  }

  private updateHeight(node: AVLNode<T>) {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  private rotateRight(node: AVLNode<T>) {
    const leftNode = node.left as AVLNode<T>;
    node.left = leftNode.right;
    node.right = node;

    this.updateHeight(node);
    this.updateHeight(leftNode);
    return leftNode;
  }

  private rotateLeft(node: AVLNode<T>) {
    const rightNode = node.right as AVLNode<T>;
    node.right = rightNode.left;
    rightNode.left = node;

    this.updateHeight(node);
    this.updateHeight(rightNode);

    return rightNode;
  }

  private balanceNode(node: AVLNode<T>): AVLNode<T> {
    this.updateHeight(node);
    const balance = this.balanceFactor(node);
    if (balance > 1) {
      if (this.balanceFactor(node.left) < 0) {
        node.left = this.rotateLeft(node.left as AVLNode<T>);
      }
      return this.rotateRight(node);
    } else if (balance < -1) {
      if (this.balanceFactor(node.right) > 0) {
        node.right = this.rotateRight(node.right as AVLNode<T>);
      }
      return this.rotateLeft(node);
    }
    return node;
  }

  public insert(value: T): void {
    this.root = this._insert(this.root, value);
  }
  private _insert(node, value) {
    if (node === null) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    }
    return node;
  }

  public search(value: T) {
    return this._search(this.root, value);
  }

  private _search(node: AVLNode<T> | null, value: T) {
    if (node === null) return false;

    if (value < node.value) {
      return this._search(node.left, value);
    } else if (value > node.value) {
      return this._search(node.right, value);
    } else if (value === node.value) return true;
  }

  public delete(value: T): void {
    this.root = this._delete(this.root, value);
  }
  private _delete(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (node === null) return null;
    if (value < node.value) {
      node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      node.right = this._delete(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.value = this.minValue(node.right);
      node.right = this._delete(node.right, node.value);
    }

    return this.balanceNode(node);
  }

  private minValue(node: AVLNode<T> | null): T {
    let minValue = node?.value;
    while (node!.left !== null) {
      minValue = node!.left.value;
      node = node!.left;
    }
    return minValue as T;
  }
}

const list = new AVLTree();

list.insert(6);
list.insert(34);
list.insert(0);
list.insert(2);
list.insert(12);
list.insert(65);
console.log("eddddd");
console.log(list);
console.log(list.search(12));
list.delete(12);
console.log(list.search(12));
