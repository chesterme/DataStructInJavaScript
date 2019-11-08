var stack = new ArrayStack(10);
stack.makeEmpty();

for(var i = 0; i < 5; i++){
    stack.push("i = " + i);
}

while(!stack.isEmpty()){
    console.log(stack.pop());
}