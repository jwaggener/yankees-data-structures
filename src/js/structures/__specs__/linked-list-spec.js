import {expect} from "chai";
import {
  add,
  insertAt,
  linkedlist,
  node,
  removeFrom
} from "../linked-list";

describe("linkedlist", () => {

  it("should create a linkedlist", () => {
    const ll = linkedlist();

    expect(ll.head).to.be.null;
    expect(ll.size).to.equal(0);
  });

  it("should create a node", () => {
    const element = {hello:"world"},
      n = node(element);

    expect(n.element).to.equal(element);
    expect(n.next).to.be.null;
  });

  it("should return true for isEmpty method if nothing has been added", () => {
    const ll = linkedlist();

    expect(ll.isEmpty()).to.be.true;
  });

  describe("add", () => {
    it("should add a node as head to linkedlist", () => {
      const element = {hello:"world"},
        ll = linkedlist();

      expect(ll.head).to.be.null;

      add(element, ll);

      expect(ll.head).to.not.be.null;
      expect(ll.size).to.equal(1);
    });

    it("should add a node to linkedlist", () => {
      const element01 = {hello:"world01"},
        element02 = {hello:"world02"},
        element03 = {hello:"world03"},
        ll = linkedlist();

      expect(ll.head).to.be.null;

      add(element01, ll);
      add(element02, ll);
      add(element03, ll);

      expect(ll.head.next.element).to.equal(element02);
      expect(ll.head.next.element.hello).to.equal("world02");
      expect(ll.size).to.equal(3);
    });
  });

  describe("insertAt", () => {
    it("sets head to node if index is 0", () => {
      const element01 = {hello:"world01"},
        element02 = {hello:"world02"},
        element03 = {hello:"world03"},
        ll = linkedlist();

      add(element01, ll);
      add(element02, ll);

      insertAt(element03, 0, ll);

      expect(ll.head.element).to.equal(element03);
    });

    it("inserts a node at the given index", () => {
      const element01 = {hello:"world01"},
        element02 = {hello:"world02"},
        element03 = {hello:"world03"},
        ll = linkedlist();

      add(element01, ll);
      add(element02, ll);

      insertAt(element03, 1, ll);

      expect(ll.head.next.element).to.equal(element03);
    });
  });

  describe("deleteAt", () => {

    it("deletes a node at head", () => {
      const element01 = {hello:"world01"},
        element02 = {hello:"world02"},
        element03 = {hello:"world03"},
        ll = linkedlist();

      add(element01, ll);
      add(element02, ll);
      add(element03, ll);

      removeFrom(0, ll);

      expect(ll.head.element).to.equal(element02);
    });

    it("deletes a node at the given index", () => {
      const element01 = {hello:"world01"},
        element02 = {hello:"world02"},
        element03 = {hello:"world03"},
        ll = linkedlist();

      add(element01, ll);
      add(element02, ll);
      add(element03, ll);

      removeFrom(2, ll);

      expect(ll.size).to.equal(2);
      expect(ll.head.next.element).to.equal(element02);
    });

  })

});
