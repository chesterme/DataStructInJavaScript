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



// 储存节点
function TreeNode(data, left, right, parent){
    this.data = data; // 数据域
    this.left = left; // 指针，指向它的左儿子
    this.right = right; // 指针，指向它的右儿子
    this.parent = parent; // 指针，指向它的父节点
    this.pushCounter = 0; // 记录入栈次数
}

TreeNode.prototype.setPushCounter = function(pushCounter){
    this.pushCounter = pushCounter;
}

TreeNode.prototype.getPushCounter = function(){
    return this.pushCounter;
}

// 链式二叉树
function LinkedBinaryTree(){
    this.root = null; // 指针，指向二叉树的根节点
    this.currentSize = 0; // 二叉树的节点个数
}

LinkedBinaryTree.prototype.makeEmpty = function(){
    this.root = null;
    this.currentSize = 0;
}

LinkedBinaryTree.prototype.isEmpty = function(){
    return this.currentSize == 0;
}

LinkedBinaryTree.prototype.getCurrentSize = function(){
    return this.currentSize;
}

// 构建一个二叉树
// input是一个数组
LinkedBinaryTree.prototype.create = function(input){
    if(input.length == 0){
        console.log("输入源不能为空");
        return false;
    }

    // 构建根节点
    var inputIndex = 0;
    if(input[inputIndex] == null){
        console.log("根节点不能为空");
        return false;
    }
    var tempNode = new TreeNode(input[inputIndex++], null, null, null);
    this.root = tempNode;
    this.currentSize++;
    // 构建一个队列
    var queue = new LinkedQueue();
    queue.makeEmpty();
    // 根节点入队
    queue.enqueue(tempNode);
    // 当前节点
    var currentNode = null;

    // 逐个处理输入源
    while(inputIndex < input.length){
        if(!queue.isEmpty()){
            currentNode = queue.dequeue();
            // 添加当前节点的左儿子节点
            if(input[inputIndex] == null){
                inputIndex++; // 当前节点没有左儿子节点
            }
            else{
                tempNode = new TreeNode(input[inputIndex++], null, null, null);
                tempNode.parent = currentNode;
                currentNode.left = tempNode;
                this.currentSize++;
                queue.enqueue(tempNode); // 左儿子节点入队
            }
            // 添加当前节点的右儿子节点
            if(input[inputIndex] == null){
                inputIndex++; // 当前节点没有右儿子节点
            }
            else{
                tempNode = new TreeNode(input[inputIndex++], null, null, null);
                tempNode.parent = currentNode;
                currentNode.right = tempNode;
                this.currentSize++;
                queue.enqueue(tempNode); // 右儿子节点入队
            }
        }
    }
}


// 前序遍历，递归方式
// rootNode，一棵子树的根节点
LinkedBinaryTree.prototype.preorderTraversal = function(rootNode){
    // 子树的根节点不能为空
    if(rootNode != null){
        console.log(rootNode.data);
        this.preorderTraversal(rootNode.left);
        this.preorderTraversal(rootNode.right);
    }
}

// 前序遍历，非递归方式
// rootNode，一棵子树的根节点
LinkedBinaryTree.prototype.preorderTraversalNoRecusive = function(rootNode){
    // 构建一个栈，模拟递归
    var stack = new LinkedStack();
    stack.makeEmpty();
    var start = rootNode;

    while(start != null){
        // 从子树的根节点开始，往左子树方向深入，直到最左端
        while(start != null){
            // 当前节点入栈
            stack.push(start);
            // 访问当前节点
            console.log(start.data);
            start = start.left;
        }
        // 此时到达最左端
        do{
            // 如果栈为空，即已经访问完二叉树中的所有节点，则退出
            if(stack.isEmpty()){
                return ;
            }
            // 弹出栈顶元素，并指向它的右儿子节点
            start = stack.pop();
            start = start.right;
        }while(start == null);
    }
}

// 中序遍历，递归方式
LinkedBinaryTree.prototype.inorderTraversal = function(rootNode){
    // 子树的根节点不能为空
    if(rootNode != null){
        this.inorderTraversal(rootNode.left);
        console.log(rootNode.data);
        this.inorderTraversal(rootNode.right);
    }
}

// 中序遍历，非递归方式
LinkedBinaryTree.prototype.inorderTraversalNoRecusive = function(rootNode){
    var stack = new LinkedStack();
    stack.makeEmpty();

    var start = rootNode;
    while(start != null){
        // 从当前节点开始，往左子树方向深入，直到最左端
        while(start != null){
            stack.push(start);
            start = start.left;
        }

        do{
            if(stack.isEmpty()){
                return;
            }
            start = stack.pop();
            console.log(start.data);
            start = start.right;
        }while(start == null);
    }
}

// 后序遍历，递归方式
LinkedBinaryTree.prototype.postorderTraversal = function(rootNode){
    if(rootNode != null){
        this.postorderTraversal(rootNode.left);
        this.postorderTraversal(rootNode.right);
        console.log(rootNode.data);
    }
}

// 后序遍历，非递归方式
LinkedBinaryTree.prototype.postorderTraversalNoRecusive = function(rootNode){
    var stack = new LinkedStack();
    stack.makeEmpty();

    var start = rootNode;
    while(start != null){
        // 从当前节点开始，往左子树方向深入，直到最左端
        while(start != null){
            start.pushCounter++;
            stack.push(start);
            start = start.left;
        }

        do{
            if(stack.isEmpty()){
                return;
            }
            start = stack.pop();
            if(start.pushCounter == 2){
                console.log(start.data);
            }
            else if(start.pushCounter == 1){
                start.pushCounter++;
                stack.push(start);
            }
            start = start.right;
        }while(start == null);
    }
}

// 层序遍历
LinkedBinaryTree.prototype.levelOrderTraversal = function(rootNode){
    var queue = new LinkedQueue();
    queue.makeEmpty();
    if(rootNode != null){
        queue.enqueue(rootNode);
    }
    var currentNode = null;
    while(!queue.isEmpty()){
        currentNode = queue.dequeue();
        console.log(currentNode.data);
        if(currentNode.left != null){
            queue.enqueue(currentNode.left);
        }
        if(currentNode.right != null){
            queue.enqueue(currentNode.right);
        }
    }
}

// 访问所有的叶子节点
LinkedBinaryTree.prototype.preorderPrintLeaves = function(rootNode){
    if(rootNode != null){
        if(rootNode.left == null && rootNode.right == null){
            console.log(rootNode.data);
        }
        this.preorderPrintLeaves(rootNode.left);
        this.preorderPrintLeaves(rootNode.right);
    }
}

// 二叉树的高度
LinkedBinaryTree.prototype.getHeight = function(rootNode){
    if(rootNode != null){
        var leftHeight = this.getHeight(rootNode.left);
        var rightHeight = this.getHeight(rootNode.right);
        var maxHeight = (leftHeight > rightHeight) ? leftHeight : rightHeight;
        return maxHeight + 1;
    }
    else{   
        return 0;
    }
}

// 表达式树
function ExpressionTree(stack, expression){
    this.stack = stack; // 一个栈，每个栈元素是一个指针，指向一个子树的根节点
    this.expression = expression; // 后缀表达式
}

// 构建一个表达式树
ExpressionTree.prototype.create = function(){
    // 解析后缀表达式
    var part = [];
    var expressionIndex = 0;
    var operand = null;
    // 合法的操作符
    var operator = ['+', '-', '*', '/'];
    var newTree = null;
    var right = null;
    var left = null;

    // 忽略前面的空白字符
    while((part[0] = this.expression[expressionIndex++]) == ' '){}

    while(expressionIndex < this.expression.length){
        // 以空白字符为分隔符，获取一部分字符
        while(this.expression[expressionIndex] != ' '){
            part.push(this.expression[expressionIndex++]);
        }
        // 解析这部分字符
        operand = Number.parseFloat(part.join(''));
        // 如果是操作数，构建一棵子树，然后入栈
        if(!isNaN(operand)){
            newTree = new LinkedBinaryTree();
            newTree.root = new TreeNode(operand, null, null, null);
            newTree.currentSize++;
            this.stack.push(newTree);
        }
        else{
            var flag = false;
            for(var i = 0; i < operator.length; i++){
                if(part[0] == operator[i]){
                    flag = true;
                    break;
                }
            }

            // 如果是操作符，则从栈中弹出两个元素，以该操作符为根节点，将这个元素分别插入到它的左右子树中，最后将这个新的树入栈
            if(flag){
                right = this.stack.pop();
                left = this.stack.pop();
                newTree = new LinkedBinaryTree();
                newTree.root = new TreeNode(part[0], left.root, right.root, null);
                left.root.parent = right.root.parent = newTree.root;
                newTree.currentSize = right.currentSize + left.currentSize + 1;
                this.stack.push(newTree);
            }
        }

        // 清空part数组内容
        while(part.length != 0){
            part.pop();
        }
        // 忽略前面的空白字符
        while((part[0] = this.expression[expressionIndex++]) == ' '){}
    }
    return this.stack.pop();
}
