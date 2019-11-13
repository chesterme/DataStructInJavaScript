var tree = new ArrayBinaryTree();
var maxSize = 20;
tree.makeEmpty(maxSize);

for(var i = 0; i < maxSize; i++){
    tree.insertByEnd(i);
}

console.log("中序遍历：");
tree.inorderTraveral(1);

console.log("先序遍历：");
tree.preorderTraversal(1);

console.log("后序遍历：");
tree.postorderTraversal(1);

console.log("非递归的先序遍历：");
tree.preorderTraversalNoRecusive(1);

console.log("非递归的中序遍历：");
tree.inorderTraveralNoRecusive(1);

console.log("非递归的后序遍历：");
tree.postorderTraveralNoRecusive(1);

console.log("层序遍历：");
tree.levelOrderTraversal(1);

console.log("采用先序遍历的方式访问所有的叶子节点：");
tree.preorderPrintLeaves(1);

console.log("采用先序遍历的方式访问所有的叶子节点，非递归方式：");
tree.preorderPrintLeavesNoRecusive(1);

console.log("二叉树的高度: ");
console.log(tree.getHeight(1));