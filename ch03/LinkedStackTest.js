var stack = new LinkedStack();
stack.makeEmpty();

for(var i = 1; i < 20; i++){
    stack.push("i = " + i);
}

while(!stack.isEmpty()){
    console.log(stack.pop());
}