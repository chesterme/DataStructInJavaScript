var tree = new BinarySearchTree();
var input = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

for(var i = 0; i < input.length; i++){
    tree.insert(tree.root, input[i]);
}

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


var targetIndex = 3;
console.log("删除元素：" + input[3]);
tree.delete(input[3]);
console.log("二叉树的先序遍历，递归方式：");
tree.preorderTraversal(tree.root);
