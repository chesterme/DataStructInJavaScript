// 节点
function Node(data, next, previous){
    this.data = data;
    this.next = next;
    this.previous = previous;
}

// 队列结构
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

// 栈结构
function LinkedStack(){
    // 头节点
    this.header = new Node(null, null, null);
    // 尾节点
    this.tail = new Node(null, null, null);
    // 栈大小
    this.currentSize = 0;
}

// 构建一个空白的栈
LinkedStack.prototype.makeEmpty = function(){
    this.header.next = this.tail;
    this.header.previous = this.tail;
    this.tail.previous = this.header;
    this.tail.next = this.header;
    this.currentSize = 0;
}

// 判断栈是否为空
LinkedStack.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

// 插入一个元素
LinkedStack.prototype.push = function(value){
    // 定位到尾节点的前一个节点
    var targetNode = this.tail.previous;
    var tempNode = new Node(value, null, null);
    tempNode.next = targetNode.next;
    targetNode.next.previous = tempNode;
    targetNode.next = tempNode;
    tempNode.previous = targetNode;
    this.currentSize++;
    return true;
}

// 删除一个元素
LinkedStack.prototype.pop = function(){
    // 定位到尾节点的前一个节点
    var deletedNode = this.tail.previous;
    deletedNode.previous.next = deletedNode.next;
    deletedNode.next.previous = deletedNode.previous;
    this.currentSize--;
    return deletedNode.data;
}

// 存储结构
function ArrayBinaryTree(){
    this.data = null;
    this.currentSize = 0;
}

ArrayBinaryTree.prototype.isEmpty = function(){
    return this.currentSize == 0;
}

ArrayBinaryTree.prototype.makeEmpty = function(maxSize){
    this.data = new Array(maxSize);
    this.currentSize = 0;
}

// 从二叉树的末尾处开始插入元素
ArrayBinaryTree.prototype.insertByEnd = function(value){
    this.data[++this.currentSize] = value;
}

// 从二叉树的末尾处开始删除元素
ArrayBinaryTree.prototype.deleteByEnd = function(){
    var deleted = this.data[this.currentSize - 1];
    this.currentSize--;
    return deleted;
}

// 中序遍历
ArrayBinaryTree.prototype.inorderTraveral = function(index){
    if(index >= 1 && index <= this.currentSize){
        // 先访问它的左子树
        this.inorderTraveral(2 * index);
        // 然后访问当前节点
        if(this.data[index] != null){
            console.log(this.data[index]);
        }
        // 最后访问它的右子树
        this.inorderTraveral(2*index + 1);
        
    }
}

// 中序遍历非递归方法
ArrayBinaryTree.prototype.inorderTraveralNoRecusive = function(index){
    // 构建一个栈，模拟递归
    var stack = new LinkedStack();
    stack.makeEmpty();

    var start = index;
    while(start >= 1 && start <= this.currentSize){
        // 遍历目标节点的左子树
        while(start >= 1 && start <= this.currentSize){
            stack.push(start);
            start = start * 2;
        }
        // 此时已经到达目标节点的最左端
        do{
            if(stack.isEmpty()){
                return ;
            }
            // 访问栈顶元素
            start = stack.pop();
            if(this.data[start] != null){
                console.log(this.data[start]);
            }
            start = start * 2 + 1;
        }while(start > this.currentSize);
    }
}

// 先序遍历
ArrayBinaryTree.prototype.preorderTraversal = function(index){
    if(index >= 1 && index <= this.currentSize){
        if(this.data[index] != null){
            // 先访问当前节点
            console.log(this.data[index]);
        }   
        // 然后访问它的左子树
        this.preorderTraversal(index * 2);
        // 最后访问它的右子树
        this.preorderTraversal(index * 2 + 1);
    }
}

// 先序遍历非递归
ArrayBinaryTree.prototype.preorderTraversalNoRecusive = function(index){
    // 使用一个栈来模拟递归
    var stack = new LinkedStack();
    stack.makeEmpty();
    var start = index;

    while(start >= 1 && start <= this.currentSize){
        while(start >= 1 && start <= this.currentSize){
            if(this.data[start] != null){
                // 首先访问当前节点
                console.log(this.data[start]);
            }
            // 将当前节点入栈
            stack.push(start);
            // 深入它的左节点
            start = start * 2;
        }
        // 此时已经来到一棵子树的最左端，弹出栈顶元素
        do{
            // 如果栈为空，说明已经遍历完整个二叉树
            if(stack.isEmpty()){
                return;
            }
            start = stack.pop();
            // 转向它的右儿子
            start = start * 2 + 1;
        }while(start > this.currentSize);
    }
}

// 后序遍历
ArrayBinaryTree.prototype.postorderTraversal = function(index){
    if(index >= 1 && index <= this.currentSize){
        // 先访问它的左子树
        this.postorderTraversal(index * 2);
        // 然后访问它的右子树
        this.postorderTraversal(index * 2 + 1);
        if(this.data[index] != null){
            // 最后访问该节点
            console.log(this.data[index]);
        }    
    }
}

// 后序遍历非递归方法
ArrayBinaryTree.prototype.postorderTraveralNoRecusive = function(index){
    // 构建一个辅助数组，记录每一个节点入栈次数
    var pushCounter = new Array(this.currentSize + 1);
    for(var i = 0; i < pushCounter.length; i++){
        pushCounter[i] = 0;
    }

    // 构建一个栈，模拟递归
    var stack = new LinkedStack();
    stack.makeEmpty();
    var start = index;
    while(start >= 1 && start <= this.currentSize){
        // 遍历目标节点的左子树
        while(start >= 1 && start <= this.currentSize){
            stack.push(start);
            pushCounter[start]++; // 入栈次数+1
            start = start * 2;
        }
        // 此时已经到达目标节点的最左端
        do{
            if(stack.isEmpty()){
                return ;
            }
            // 弹出栈顶元素
            start = stack.pop();
            // 如果该节点已经入栈两次，说明从左子树开始向下深入和从右子树开始向下深入都回归到该节点，则可以访问它
            if(pushCounter[start] == 2 && this.data[start] != null){
                console.log(this.data[start]);
            }
            // 需要从它的右子树开始向下深入
            else if(pushCounter[start] == 1){
                pushCounter[start]++;
                stack.push(start);
            }
            // 转向它的右节点
            start = start * 2 + 1;
        }while(start > this.currentSize);
    }
}

// 层序遍历
ArrayBinaryTree.prototype.levelOrderTraversal = function(index){
    // 构建一个空白的队列
    var queue = new LinkedQueue();
    queue.makeEmpty();

    var start = index; // 目标元素的下标
    queue.enqueue(start);

    while(!queue.isEmpty()){
        start = queue.dequeue();
        if(this.data[start] != null){
            // 访问节点元素
            console.log(this.data[start]);
        }
        // 将当前节点的左右子节点入队
        if(start * 2 >= 1 && start * 2 <= this.currentSize){
            queue.enqueue(start * 2);
        }
        if((start * 2 + 1) >= 1 && (start * 2 + 1) <= this.currentSize){
            queue.enqueue(start * 2 + 1);
        }
    }
}

// 先序遍历的方式输出所有的叶子节点
ArrayBinaryTree.prototype.preorderPrintLeaves = function(index){
    if(index >= 1 && index <= this.currentSize){
        // 判断当前节点是否是叶子节点
        if(index * 2 > this.currentSize){
            console.log(this.data[index]);
        }
        this.preorderPrintLeaves(index * 2);
        this.preorderPrintLeaves(index * 2 + 1);
    }
}

// 先序遍历的方式输出所有的叶子节点的非递归方式
ArrayBinaryTree.prototype.preorderPrintLeavesNoRecusive = function(index){
    // 构建一个栈
    var stack = new LinkedStack();
    stack.makeEmpty();

    var start = index;
    while(start >= 1 && start <= this.currentSize){
        // 定位到目标节点的最左端
        while(start >= 1 && start <= this.currentSize){
            stack.push(start);
            start = start * 2;
        }
        do{
            if(stack.isEmpty()){
                return;
            }
            start = stack.pop();
            // 判断它是否是叶子节点
            if(start * 2 > this.currentSize && this.data[start] != null){
                console.log(this.data[start]);
            }
            start = start * 2 + 1;
        }while(start > this.currentSize);
        
    }
}

// 求二叉树的高度
ArrayBinaryTree.prototype.getHeight = function(index){
    var leftHeight = rightHeight = maxHeight = 0;
    // 非空树高度等于左右子树的最大值加1
    if(index >= 1 && index <= this.currentSize){
        leftHeight = this.getHeight(index * 2);
        rightHeight = this.getHeight(index * 2 + 1);
        maxHeight = (leftHeight > rightHeight) ? leftHeight : rightHeight;
        return maxHeight + 1;
    }
    // 空树高度为1
    else{
        return 0;
    }
}

// 使用层次遍历的方式构建一个二叉树
// input是一个数组，若元素内容为0表示该节点为空节点
ArrayBinaryTree.prototype.createInLevel = function(input){
    // 构建一个队列
    var queue = new LinkedQueue();
    queue.makeEmpty();

    if(input.length == 0){
        console.log("输入源不能为空");
        return false;
    }

    // 将输入源的第一个元素作为根节点
    var treeIndex = 1; // 根节点下标
    var inputIndex = 0; // 输入源下标
    this.data[treeIndex] = input[inputIndex++];
    this.currentSize++;
    queue.enqueue(treeIndex);

    while(!queue.isEmpty() && inputIndex < input.length){
        treeIndex = queue.dequeue();
        // 添加当前节点的左儿子节点
        if(input[inputIndex] == 0){
            this.data[treeIndex * 2] = null; // 左儿子节点为空
            inputIndex++;
        }
        else{
            this.data[treeIndex * 2] = input[inputIndex++];
            queue.enqueue(treeIndex * 2); // 将左儿子添加到队列中
            this.currentSize++;
        }

        // 添加当前元素的右儿子
        if(input[inputIndex] == 0){
            this.data[treeIndex * 2 + 1] = null; // 右儿子节点为空
            inputIndex++;
        }
        else{
            this.data[treeIndex * 2 + 1] = input[inputIndex++];
            queue.enqueue(treeIndex * 2 + 1); 
            this.currentSize++;
        }
    }

}
