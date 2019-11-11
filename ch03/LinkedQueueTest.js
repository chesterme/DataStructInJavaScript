var queue = new LinkedQueue(5);
queue.makeEmpty();
for(var i = 0; i < 5; i++){
    queue.enqueue("i = " + i);
}

while(!queue.isEmpty()){
    console.log(queue.dequeue());
}