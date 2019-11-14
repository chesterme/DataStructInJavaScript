var tree = new LinkedBinaryTree();
var input = [];
for(var i = 0; i < 20; i++){
    input[i] = i;
}
tree.create(input);
console.log("二叉树的节点个数：" + tree.getCurrentSize());
console.log("二叉树的先序遍历，递归方式：");
tree.preorderTraversal(tree.root);
console.log("二叉树的先序遍历，非递归方式：");
tree.preorderTraversalNoRecusive(tree.root);
console.log("二叉树的中序序遍历，递归方式：");
tree.inorderTraversal(tree.root);
console.log("二叉树的中序遍历，非递归方式：");
tree.inorderTraversalNoRecusive(tree.root);
console.log("二叉树的后序序遍历，递归方式：");
tree.postorderTraversal(tree.root);
console.log("二叉树的后序遍历，非递归方式：");
tree.postorderTraversalNoRecusive(tree.root);
console.log("二叉树的层序遍历：");
tree.levelOrderTraversal(tree.root);
console.log("访问二叉树的所有叶子节点：");
tree.preorderPrintLeaves(tree.root);
console.log("二叉树的高度：");
console.log(tree.getHeight(tree.root));