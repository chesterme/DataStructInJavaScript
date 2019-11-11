var stack = new LinkedStack();
stack.makeEmpty();

var expression = "  2  * ( 9 +  6 / 3  - 5 )  + 4  ";
var infixToPostfix = new InfixToPostfix(expression, stack);
console.log(infixToPostfix.toPostfix());