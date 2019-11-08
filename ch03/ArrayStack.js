function ArrayStack(maxSize){
    // 使用一个数组表示栈内容
    this.data = new Array(maxSize);
    // 栈顶指针
    this.top = null;
    // 栈底指针
    this.bottom = null;
    // 栈的大小
    this.currentSize = 0;
}

// 创建一个空白的栈
ArrayStack.prototype.makeEmpty = function(){
    this.top = this.bottom = 0;
    this.currentSize = 0;
}

// 判断栈是否为空
ArrayStack.prototype.isEmpty = function(){
    return this.top == this.bottom;
}

// 判断栈是否已经满
ArrayStack.prototype.isFull = function(){
    return this.top == (this.data.length - 1);
}

// 插入一个元素
ArrayStack.prototype.push = function(value){
    if(this.isFull()){
        console.log("栈已满");
        return false;
    }
    this.data[this.top++] = value;
    this.currentSize++;
    return true;
}

// 删除一个元素
ArrayStack.prototype.pop = function(){
    if(this.isEmpty()){
        console.log("栈为空");
        return false;
    }
    var result = this.data[this.top];
    this.top--;
    this.currentSize--;
    return result;
}