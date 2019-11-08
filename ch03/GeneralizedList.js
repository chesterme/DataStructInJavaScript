// 单链表存储结构
function Node(data, next){
    this.data = data; // 保存节点的数据
    this.next = next; // 指针，指向下一个节点
}

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
    if(index == 1 && this.isEmpty()){
        return this.insertByStart(value);
    }
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
    tempNode.data = value;
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

// 显示链表的内容
LinkedList.prototype.showMessage = function(){
    var result = [];
    var currentNode = this.header.next;
    while(currentNode != this.tail){
        result.push(currentNode.data);
        currentNode = currentNode.next;
    }
    return result;
}


// 广义表的存储结构
function GNode(data, next, tag, subList){
    this.data = data; // 广义表节点内容
    this.next = next; // 指向下一个广义表节点
    this.tag = tag; // 表示广义表节点是否有一个子链表, 0|1
    this.subList = subList; //指针，指向广义表节点的子链表
}

function GeneralizedList(){

    this.header = new GNode(null, null, null, null);
    this.tail = new GNode(null, null, null, null);
    this.currentSize = 0;

}


GeneralizedList.prototype.getLength = function(){
    return this.currentSize;
}

GeneralizedList.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

GeneralizedList.prototype.makeEmpty = function(){
    this.header.next = this.tail;
    this.currentSize = 0;
    return true;
}

// 在指定位置上插入单个元素
GeneralizedList.prototype.insert = function(value, index){
    if(this.isEmpty() && index == 1){
        this.insertByStart(value);
    }
    // index是否合法
    if(index < 1 || index > this.currentSize){
        console.log("插入位置不合法");
        return false;
    }
    var currentNode = this.header;
    var count = 0;
    // 找到插入位置的前一个位置
    while(count < index){
        currentNode = currentNode.next;
        count++;
        if(count == index - 1){
            break;
        }
    }
    // 新建一个节点
    var tempNode = new GNode(value, null, 0, null);
    tempNode.next = currentNode.next;
    currentNode.next = tempNode;
    this.currentSize++;
    return true;
};

// 在指定位置上插入一个链表
GeneralizedList.prototype.insertAList = function(list, index){
    if(this.isEmpty() && index == 1){
        this.insertAListByStart(list);
    }
    // index是否合法
    if(index < 1 || index > this.currentSize){
        console.log("插入位置不合法");
        return false;
    }
    var currentNode = this.header;
    var count = 0;
    // 找到插入位置的前一个位置
    while(count < index){
        currentNode = currentNode.next;
        count++;
        if(count == index - 1){
            break;
        }
    }
    // 新建一个节点
    var tempNode = new GNode(null, null, 1, list);
    tempNode.next = currentNode.next;
    currentNode.next = tempNode;
    this.currentSize++;
    return true;
};

// 在链表的开始位置插入一个元素
GeneralizedList.prototype.insertByStart = function(value){
    var tempNode = new GNode(value, null, 0, null);
    tempNode.next = this.header.next;
    this.header.next = tempNode;
    this.currentSize++;
    return true;
};

// 在广义表开始位置插入一个链表
GeneralizedList.prototype.insertAListByStart = function(list){
    var tempNode = new GNode(null, null, 1, list);
    tempNode.next = this.header.next;
    this.header.next = tempNode;
    this.currentSize++;
    return true;
}

// 查找指定位置上的内容
GeneralizedList.prototype.findKth = function(index){
    // index是否合法
    if(index < 1 || index > this.currentSize){
        console.log("查找位置不合法");
        return false;
    }
    // 定位到指定位置
    var currentNode = this.header;
    var count = 0;
    while(count < index){
        currentNode = currentNode.next;
        count++;
    }
    return currentNode;
};

// 删除指定位置上的节点
GeneralizedList.prototype.delete = function(index){
    // index是否合法
    if(index < 1 || index > this.currentSize){
        console.log("查找位置不合法");
        return false;
    }
    // 定位到指定位置的前一个位置
    var currentNode = this.header;
    var count = 0;
    while(count < index - 1){
        currentNode = currentNode.next;
        count++;
    }
    var deleted = currentNode.next;
    currentNode.next = deleted.next;
    this.currentSize--;
    return deleted;
}

// 显示节点的内容
GeneralizedList.prototype.showMessage = function(currentNode){
    if(currentNode.tag == 0){
        return currentNode.data;
    }
    else if(currentNode.tag == 1){
        return currentNode.subList.showMessage();
    }
}