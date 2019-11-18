var tree = new BalanceBinaryTree();
var input = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

for(var i = 0; i < input.length; i++){
    console.log("插入元素：" + input[i] + "后，二叉树的先序遍历，递归方式：");
    tree.insert(tree.root, input[i]);
    tree.preorderTraversal(tree.root);
}

for(var i = 0; i < input.length; i++){
    console.log("删除元素：" + input[i] + "后，二叉树的先序遍历，递归方式为：");
    tree.delete(tree.root, input[i]);
    tree.preorderTraversal(tree.root);
    console.log("删除元素：" + input[i] + "后，二叉树的节点数为：" + tree.currentSize);
}