var queue = new ArrayQueue(5);
for(var i = 0; i < 5; i++){
    queue.enqueue("i = " + i);
}

while(!queue.isEmpty()){
    console.log(queue.dequeue());
}