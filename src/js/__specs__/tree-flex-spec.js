import {bstToFlex} from "../tree-flex";
import { expect } from "chai";

describe("bstToFlex", () => {

  it("should", () => {

    const tree = {root:{element:"root", right:null, left: null}};
    // level 1
    tree.root.left = {element:"foo", left:null, right:null};
    tree.root.right = {element:"bar", left:null, right:null};

    // level 2
    //tree.root.left.left = {element:"hello left", left:null, right:null};
    //tree.root.left.right = {element:"world left", left:null, right:null};
    tree.root.right.left = {element:"hello right", left:null, right:null};
    tree.root.right.right = {element:"world right", left:null, right:null};

    tree.root.right.left.left = {element:"hello again", left:null, right:null};

    const result = bstToFlex(tree);
    console.log(
      "result", result
    );
    /*expect(
      bstToFlex(tree)
    ).to.deep.equal(
      [
        {element:"root", left: {element:"foo", left:null, right:null}, right: {element:"bar", left:null, right:null}},
        {element:"foo", left:null, right:null},
        {element:"bar", left:null, right:null}
      ]
    );*/

  });

});
