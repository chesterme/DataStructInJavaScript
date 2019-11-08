var expression = "  1.2  1.3  + 2  4.2 *  - ";
var stack = new LinkedStack();
stack.makeEmpty();
var postfixExpression = new PostfixExpression(expression, stack);

console.log("结果为： " + postfixExpression.calculate());
