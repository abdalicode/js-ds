type DataValue = [string, any];
type Data = DataValue[];
class HashTable {
  private data: Data[];
  constructor(size: number) {
    this.data = new Array(size);
  }

  private _hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  public set(key: string, value: any) {
    const address = this._hash(key);
    if (!this.data[address]) this.data[address] = [];
    this.data[address].push([key, value]);
  }

  public get(key: string) {
    const address = this._hash(key);
    const bucket = this.data[address];
    if (!bucket) return;
    for (let i = 0; i < bucket.length; i++)
      if (bucket[i][0] === key) return bucket[i][1];
  }

  public keys() {
    const keys: string[] = [];
    for (const bucket of this.data) {
      if (bucket) bucket.forEach((listItem) => keys.push(listItem[0]));
    }
    return keys;
  }
}

const arr = [3, 2, 6, 5, 7, 4, 65, 33, 32, 33];
function firstRecurringCharacter(arr) {
  const chars = new HashTable(arr.length);
  for (const char of arr) {
    if (chars.get(char) !== undefined) return char;
    chars.set(char, char);
  }
}
const result = firstRecurringCharacter(arr);
console.log(result);
