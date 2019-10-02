// modified code found here by Sumit Ghosh:
// https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
// Inorder, Preorder, Postorder
// https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
// print by its rows
// https://stackoverflow.com/questions/42800281/how-would-you-print-a-binary-tree-by-its-rows
// BFS (breadth first search), level-order-traversal
// https://hackernoon.com/breadth-first-search-in-javascript-e655cd824fa4

// another example considered
// https://gist.github.com/benlesh/9128359

export function binarySearchTree(data){
  const tree = {};
  tree.root = null;
  tree.data = data;

  return tree;
}

export function node(element, tree){
  const node = {};
  node.element = element;
  node.left = null;
  node.right = null;
  return node;
}

// data will be an element describing a ball player
// key - a key on the node.element that is a value to be compared eg 'HR' for homeruns
// the tree to manipulate
export function insert(data, key, tree){

  const newNode = node(data, tree);

  if(tree.root === null){
    tree.root = newNode;
  } else {
    insertNode(tree.root, newNode, key);
  }
}

// node - node to traverse
// newNode - node to insert
// key - a key on the node.element that is a value to be compared eg 'HR' for homeruns
export function insertNode(node, newNode, key){
  /*console.log(
    'key', key
  );
  console.log("insert",
    'newNode.element[key]',
    newNode.element[key],
    'node.element[key]',
    node.element[key]
  );
  console.log("____");*/
  // left
  if(newNode.element[key] < node.element[key]){

    if(node.left === null){
      node.left = newNode;
    } else {
      insertNode(node.left, newNode, key)
    }

  }
  // right
  else {
    if(node.right === null){
      node.right = newNode;
    } else {
      insertNode(node.right, newNode, key)
    }

  }
}

// data - might should call this element as it will be one of the players from JSON
// key - key on the players construct
// tree - tree to be manipulated
export function remove(data, key, tree){
  tree.root = removeNode(tree.root, data);
}

export function removeNode(node, data, key) {

  // if the root is null then tree is
  // empty
  if(node === null) { return null };

  // recurr to the left
  if(data[key] < node.element[key]){
    node.left = removeNode(node.left, data, key);
    return node;
  }

  // recurr to the right
  if(data[key] > node.element[key]){
    node.right = removeNode(node.right, data, key);
    return node;
  }

  // default case is not to recurr but to delete

  // deleting node with no children
  if(node.left === null && node.right === null){
    node = null;
    return node;
  }

  // deleting node with one children, left
  if(node.left === null){
    node = node.right;
    return node;
  }

  // deleting node with one children, right
  if(node.right === null)
  {
    node = node.left;
    return node;
  }

  // Deleting node with two children
  // minumum node of the rigt subtree
  // is stored in aux
  var aux = findMinNode(node.right);
  node.element = aux.element;

  node.right = this.removeNode(node.right, aux.element, key);
  return node;
}

// inorder traversal of the tree, Left, Root, Right
// 1. Traverse the left subtree i.e. perform inorder on left subtree
// 2. visit the root
// 3. Traverse the right subtree i.e. perform inorder on the right subtree
export function inorder(node) {
  if(node !== null) {
    inorder(node.left);
    console.log(node.element);
    inorder(node.right);
  }
}

// preorder traversal of the tree, Root, Left, Right
// 1. visit the root
// 2. Traverse the left subtree i.e. perform preorder on the left
// 3. Traverse the right subtree i.e. perform preorder on the right
export function preorder(node) {
  if(node != null) {
    console.log(node.element);
    preorder(node.left);
    preorder(node.right);
  }
}

// postorder traversal of the tree Left, Right, Root
// 1. Traverse the left subtree i.e. perform postorder on the left
// 2. Traverse the right subtree i.e. perform the postorder on the right
// 3. visit the root
export function postorder(node){
  if(node != null) {
    postorder(node.left);
    postorder(node.right);
    console.log(node.element);
  }
}

// helpers
// finds the minimum node in a tree
// searched from the given node
export function findMinNode(node){
  if(node.left === null){
    return node;
  } else {
    return findMinNode(node.left);
  }
}

// search - find an element in the tree based on a value in the element.
// see your yankees.json for what values are available
// search for a node with given data
export function search(node, data, key) {
  // if trees is empty return null
  if(node === null){ return null }

  // if data is less than node's data
  // move left
  if(data[key] < node.element[key]){
    return search(node.left, data, key);
  }

  // if data is less than node's data
  // move left
  if(data > node.data){
    return this.search(node.right, data, key);
  }

  // if data is equal to the node data
  // default case, return node
  return node;
}
