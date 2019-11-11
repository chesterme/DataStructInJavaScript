// 顺序队列
function ArrayQueue(maxSize){
    this.data = new Array(maxSize);
    this.currentSize = 0;
    this.front = 0; // 头部指针
    this.rear = 0; // 尾部指针
}

// 队列是否已满
ArrayQueue.prototype.isFull = function(){
    return (this.rear + 1) % this.data.length == this.front;
}

// 队列是否为空
ArrayQueue.prototype.isEmpty = function(){
    return this.front == this.rear;
}

// 入队
ArrayQueue.prototype.enqueue = function(value){
    if(!this.isFull()){
        this.data[this.rear++] = value;
        if(this.rear > this.data.length - 1){
            this.rear = this.rear % this.data.length;
        }
    }
}

// 出队
ArrayQueue.prototype.dequeue = function(){
    if(!this.isEmpty()){
        var result = this.data[this.front++];
        if(this.front > this.data.length - 1){
            this.front = this.front % this.data.length;
        }
        return result;
    }
}

// 访问队头元素
ArrayQueue.prototype.getFront = function(){
    return this.data[this.front];
}

// 访问队尾元素
ArrayQueue.prototype.getRear = function(){
    return this.data[this.rear];
}