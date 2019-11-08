// 链式存储结构
function Node(){
    this.data = null;
    this.next = null;
}

Node.prototype.getData = function(){
    return this.data;
};

Node.prototype.getNext = function(){
    return this.next;
};

Node.prototype.setData = function(newData){
    this.data = newData;
};

Node.prototype.setNext = function(newNext){
    this.next = newNext;
};

function LinkedList(){

    
    this.header = new Node();
    this.tail = new Node();
    this.currentSize = 0;

}

// 表的长度
LinkedList.prototype.getLength = function(){
    return this.currentSize;
};

// 判断表是否为空
LinkedList.prototype.isEmpty = function(){
    return this.header.next == this.tail;
};

// 初始化链式表
LinkedList.prototype.makeEmpty = function(){
    this.header.next = this.tail;
};

// 查找指定位置上的元素
LinkedList.prototype.findKth = function(index){
    if(this.isEmpty()){
        console.log("链式表为空");
        return false;
    }
    if(index > this.currentSize){
        console.log("不存在指定的位置");
        return false;
    }
    var currentNode = this.header.next; // 第一个节点
    var counter = 1;
    for(; counter < index; counter++){
        currentNode = currentNode.next;
    }
    return currentNode.data;
};

// 查找某个元素
LinkedList.prototype.find = function(value){
    if(this.isEmpty()){
        console.log("链式表为空");
        return false;
    }
    var currentNode = this.header.next; // 第一个节点
    var count = 1;
    for(; currentNode.next != tail.tail; currentNode = currentNode.next){
        if(currentNode.data == value){
            return count;
        }
        count++;
    }
    return false;
};

// 在指定位置插入元素
LinkedList.prototype.insert = function(value, index){
    // [1,...,currentSize]
    if(index < 1 || index > this.currentSize){
        console.log("插入位置不合适");
        return false;
    }
    var tempNode = new Node();
    tempNode.data = value;
    var currentNode = this.header.next;
    var count = 1;
    for(; count < index; count++){
        currentNode = currentNode.next;
    }
    tempNode.next = currentNode.next;
    currentNode.next = tempNode;
    this.currentSize++;
    return true;
};

// 在链表开始处插入元素
LinkedList.prototype.insertByStart = function(value){
    var tempNode = new Node();
    tempNode.setData(value);
    tempNode.next = this.header.next;
    this.header.next = tempNode;
    this.currentSize++;
    return true;
};

// 在链表末尾插入元素
LinkedList.prototype.insertByEnd = function(value){
    return insert(value, currentSize);
};

// 在指定位置上删除元素
LinkedList.prototype.delete = function(index){
    if(index < 1 || index > this.currentSize){
        console.log("删除位置不合适");
        return false;
    }
    var currentNode = this.header;
    var count = 0;
    while(count < index - 1){
        currentNode = currentNode.next;
        count++;
    }
    var deleted = currentNode.next;
    currentNode.next = deleted.next;
    this.currentSize--;
    return deleted.data;
};

// 删除指定元素
LinkedList.prototype.deleteElement = function(value){
    if(isEmpty()){
        console.log("链表为空");
        return false;
    }
    var currentNode = this.header.next;
    while(currentNode.next != this.tail){
        if(currentNode.next.data == value){
            currentNode.next = currentNode.next.next;
            this.currentSize--;
        }
    }
    return true;
};