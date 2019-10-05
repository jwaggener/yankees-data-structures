import {expect} from "chai";
import {
  binarySearchTree,
  insert,
  insertNode,
  remove,
  removeNode,
  inorder,
  preorder,
  postorder,
  findMinNode,
  search
} from "../BinarySearchTree";

describe("Binary Search Tree", () => {

  const data1 = {
      "name": "Aaron Judge",
      "age": 27
    },
    data2 = {
      "name": "Brett Gardner",
      "age": 36
    },
    data3 = {
      "name": "Gary Sanchez",
      "age": 26
    },
    data4 = {
      "name": "Gleyber Torres",
      "age": 22
    },
    data5 = {
      "name": "Gio Urshela",
      "age": 27
    };

  it("create a tree and insert nodes. expect root to be the first and Brett to be right and Gary to be left.", () => {
    const tree = binarySearchTree();
    insert( data1, "age", tree );
    insert( data2, "age", tree );
    insert( data3, "age", tree );
    insert( data4, "age", tree );
    insert( data5, "age", tree );

    expect(tree.root.element).to.equal(data1);
    expect(tree.root.right.element).to.equal(data2);
    expect(tree.root.left.element).to.equal(data3);
    expect(tree.root.left.left.element).to.equal(data4);
    expect(tree.root.right.left.element).to.equal(data5);
  });

});
