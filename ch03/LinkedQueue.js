// 链式结点
function Node(data, next, previous){
    this.data = data;
    this.next = next;
    this.previous = previous;
}

// 链式队列
function LinkedQueue(){
    this.header = null;
    this.tail = null;
    this.currentSize = 0;
}

// 构建一个空白的链式队列
LinkedQueue.prototype.makeEmpty = function(){
    this.header = new Node(null, null, null);
    this.tail = new Node(null, null, null);
    this.header.next = this.tail;
    this.header.previous = this.tail;
    this.tail.next = this.header;
    this.tail.previous = this.header;
    this.currentSize = 0;
}

// 队列是否为空
LinkedQueue.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

// 入队
LinkedQueue.prototype.enqueue = function(value){
    // 新建一个节点
    var newNode = new Node(value, null, null);
    var previous = this.tail.previous;
    newNode.next = this.tail;
    this.tail.previous = newNode;
    newNode.previous = previous;
    previous.next = newNode;
    this.currentSize++;
    return true;
}

// 出队
LinkedQueue.prototype.dequeue = function(){
    if(this.isEmpty()){
        return false;
    }
    var result = this.header.next;
    this.header.next = result.next;
    result.next.previous = this.header;
    this.currentSize--;
    return result.data;
}