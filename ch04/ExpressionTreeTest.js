var expression = "1 2 3 * + 4  5 * 6 + 7 * +    ";
var stack = new LinkedStack();
stack.makeEmpty();
var expressionTree = new ExpressionTree(stack, expression);
var tree = expressionTree.create();
tree.levelOrderTraversal(tree.root);
