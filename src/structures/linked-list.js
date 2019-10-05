// modified code found here by Sumit Ghosh:
// https://www.geeksforgeeks.org/implementation-linkedlist-javascript/

// creates a data type of linkedlist
// with a head initialized to null
// and a size initialized to 0
export function linkedlist() {
  const _linkedlist = {};
  _linkedlist.head = null,
  _linkedlist.size = 0;
  _linkedlist.isEmpty = function isEmpty(){ return _linkedlist.size === 0 };

  return _linkedlist;
}

// creates a datatype of node
// with an 'element' - the data attached to this node
// a pointer to 'next' which points to the next node, initialized as null
export function node(element) {
  const node = {};
  node.element = element,
  //node.previous = null; // would be a double linked list.
  node.next = null;

  return node;
}

// adds a node to the linked list, using the element passed in
export function add(element, list) {
  // create a new node
  const _node = node(element);

  // a holder for the current node as we move through the list
  let _curr;

  // if the list is empty add the element and make it head
  // otherwise move through the linkedlist to place the node at the last 'next'
  if(list.head === null){
    list.head = _node;
  } else {
    _curr = list.head;

    // iterate to the end of the list
    while (_curr.next) {
      _curr = _curr.next;
    }

    // add node
    _curr.next = _node;
  }

  // increase the size of the list
  list.size++;
};

export function findNodeByKey(key){
  let _curr = list.head;

  while(_curr.next){
    if(_curr.element.key === key){
      return _curr;
    }
    _curr = _curr.next;
  }
  return null;
}

// inserts an element at an index
export function insertAt(element, index, list) {
  // if the index is larger then the size, return false
  if (index > 0 && index > list.size) { return false }

  // create the node
  const _node = node(element);
  let _curr, _prev;

  // set the current to the head
  _curr = list.head;

  // if 0, add the element to the first index
  // and reset the head to the node
  if(index === 0){
    _node.next = list.head;
    list.head = _node;
  } else {
    let i = 0;

    while(i < index){
      i++;
      _prev = _curr;
      // when you get to the item before your index
      _curr = _curr.next;
    }

    // set that item to next on your node
    _node.next = _curr;
    // complete the chain by setting next of the previous node to your new node
    _prev.next = _node;
  }

  // increase the size of the list
  list.size++;
};

export function removeFrom(index, list) {
  // if the index is larger then the size, return false
  if (index > 0 && index > list.size) { return false }

  // deleting the first element
  if(index === 0){
    list.head = list.head.next;
    return;
  }

  let _prev,
    _curr = list.head,
    i = 0;

  while(i < index) {
    i++;
    _prev = _curr;
    _curr = _curr.next;
  }

  // remove the element by skipping over the indexed node, delinking it
  _prev.next = _curr.next;

  // decrement the size
  list.size--;

  // return the removed node
  return _curr;
};

function removeElement() {return undefined};
