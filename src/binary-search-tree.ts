class BstNode {
  constructor(
    public value: string,
    public left: BstNode | null = null,
    public right: BstNode | null = null
  ) {}
}

class Bst {
  constructor(public root: BstNode | null = null) {}

  public insert(value) {
    this.root = this._insert(this.root, value);
  }

  private _insert(node, value): BstNode {
    if (node === null) return new BstNode(value);
    if (value < node.value) node.left = this._insert(node.left, value);
    else if (value > node.value) node.right = this._insert(node.right, value);
    return node;
  }

  public search(value) {
    return this._search(this.root, value);
  }

  private _search(node, value) {
    if (node === null) return false;
    if (node.value === value) return true;
    if (value < node.value) return this._search(node.left, value);
    else if (value > node.value) return this._search(node.right, value);
    return false;
  }
}

const binarySearchTree = new Bst();
binarySearchTree.insert(13);
binarySearchTree.insert(10);
binarySearchTree.insert(4);
binarySearchTree.insert(15);
// binarySearchTree.insert("apple");
// binarySearchTree.insert("application");
// binarySearchTree.insert("banana");
// binarySearchTree.insert("band");
// binarySearchTree.insert("abo");
// binarySearchTree.insert("bat");
// binarySearchTree.insert("approach");

// console.log(binarySearchTree.search("apple"));
console.log(binarySearchTree.search(13));
