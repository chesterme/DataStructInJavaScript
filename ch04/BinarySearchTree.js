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

// 二叉树节点
function TreeNode(data, left, right, parent){
    this.data = data; // 数据域
    this.left = left; // 指针，指向当前节点的左儿子
    this.right = right; // 指针，指向当前节点的右儿子
    this.parent = parent; // 指针，指向档期那节点的父节点
    this.pushCounter = 0;
}

// 搜索二叉树
function BinarySearchTree(){
    this.root = null; // 二叉树的根节点
    this.currentSize = 0; // 记录二叉树的节点数目
}

// 二叉树是否为空
BinarySearchTree.prototype.isEmpty = function(){
    return this.currentSize == 0;
}

// 二叉树的节点个数
BinarySearchTree.prototype.getCurrentSize = function(){
    return this.currentSize;
}

// 查找某个元素
BinarySearchTree.prototype.search = function(subNode, value){
    // 如果子树为空，那么查找失败
    if(subNode == null){
        return null;
    }

    // 如果是对象，那么调用自定义的比较方法进行比较
    if(typeof value == "object"){
        if(value.compareOf(subNode.data) > 0){
            return this.search(subNode.right, value);
        }
        else if(value.compareOf(subNode.data) == 0){
            return subNode;
        }
        else{
            return this.search(subNode.left, value);
        }
    }
    // 如果是基本类型，那么使用基本比较符号进行比较
    else{
        if(value > subNode.data){
            return this.search(subNode.right, value);
        }
        else if(value == subNode.data){
            return subNode;
        }
        else{
            return this.search(subNode.left, value);
        }
    }
}


// 查找最小元素
BinarySearchTree.prototype.findMin = function(subNode){
    if(subNode == null){
        return null; // 查找失败
    }
    // 如果已经到达最左端，则返回
    else if(subNode.left == null){
        return subNode;
    }
    // 如果它还有左儿子，那么设置起点为它的左儿子，然后从左子树中查找最小元素
    else{
        return this.findMin(subNode.left);
    }
}

// 查找最大元素
BinarySearchTree.prototype.findMax = function(subNode){
    if(subNode == null){
        return null;
    }
    // 已经到达最右端
    else if(subNode.right == null){
        return subNode;
    }
    else{
        return this.findMax(subNode.right);
    }
}

// 插入一个元素
BinarySearchTree.prototype.insert = function(subNode, value){
    var targetNode = null;

    // 如果二叉树为空，则使用该元素作为二叉树的根节点
    if(this.isEmpty()){
        var tempNode = new TreeNode(value, null, null, null);
        this.root = tempNode;
        this.currentSize++;
    }
    // 二叉树不为空
    else {
        // 如果子树为空，表明该为止就是元素的插入位置
        if(subNode == null){
            subNode = new TreeNode(value, null, null, null);
            this.currentSize++;
        }
        // 如果子树不为空，需要定位到插入位置
        else{
            if(typeof value == "object"){
                // 如果插入元素的值比当前节点的值大，那么需要将该元素插入到当前节点的右子树中
                if(value.compareOf(subNode.data) > 0){
                    targetNode = this.insert(subNode.right, value);
                    targetNode.parent = subNode;
                    subNode.right = targetNode;
                }
                else if(value.compareOf(subNode.data) == 0){}
                // 如果插入元素的值比当前节点的值小，那么需要将该元素插入到当前节点的左子树中
                else{
                    targetNode = this.insert(sunNode.left, value);
                    targetNode.parent = subNode;
                    subNode.left = targetNode;
                }
            }
            else{
                // 如果插入元素的值比当前节点的值大，那么需要将该元素插入到当前节点的右子树中
                if(value > subNode.data){
                    targetNode = this.insert(subNode.right, value);
                    targetNode.parent = subNode;
                    subNode.right = targetNode;
                }
                else if(value == subNode.data){}
                // 如果插入元素的值比当前节点的值小，那么需要将该元素插入到当前节点的左子树中
                else{
                    targetNode = this.insert(subNode.left, value);
                    targetNode.parent = subNode;
                    subNode.left = targetNode;
                }
            }
        }
    }
    return subNode;
}

//  删除一个元素
BinarySearchTree.prototype.delete = function(subRoot, value){
    if(subRoot == null){
        return subRoot;
    }
 
    if(typeof value == "object"){
        if(value.compareOf(subRoot.data) > 0){
            subRoot.right = this.delete(subRoot.right, value);
        }
        else if(value.compareOf(subRoot.data) < 0){
            subRoot.left = this.delete(subRoot.left, value);
        }
        else{
            // 如果有两个子节点
            if(subRoot.left != null && subRoot.right != null){
                subRoot.data = this.findMin(subRoot.right).data;
                subRoot.right = this.delete(subRoot.right, subRoot.data);
            }
            else{
                subRoot = (subRoot.left != null) ? subRoot.left : subRoot.right;
            }

            if(subRoot == null || subRoot.right == null || subRoot.left == null){
                this.currentSize--;
            }
        }
    }
    else{
        if(value > subRoot.data){
            subRoot.right = this.delete(subRoot.right, value);
        }
        else if(value < subRoot.data){
            subRoot.left = this.delete(subRoot.left, value);
        }
        else{
            // 如果有两个子节点
            if(subRoot.left != null && subRoot.right != null){
                subRoot.data = this.findMin(subRoot.right).data;
                subRoot.right = this.delete(subRoot.right, subRoot.data);
            }
            else{
                subRoot = (subRoot.left != null) ? subRoot.left : subRoot.right;
            }

            if(subRoot == null || subRoot.right == null || subRoot.left == null){
                this.currentSize--;
            }
        }
    }
}

// 前序遍历，递归方式
// rootNode，一棵子树的根节点
BinarySearchTree.prototype.preorderTraversal = function(rootNode){
    // 子树的根节点不能为空
    if(rootNode != null){
        console.log(rootNode.data);
        this.preorderTraversal(rootNode.left);
        this.preorderTraversal(rootNode.right);
    }
}

// 前序遍历，非递归方式
// rootNode，一棵子树的根节点
BinarySearchTree.prototype.preorderTraversalNoRecusive = function(rootNode){
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
BinarySearchTree.prototype.inorderTraversal = function(rootNode){
    // 子树的根节点不能为空
    if(rootNode != null){
        this.inorderTraversal(rootNode.left);
        console.log(rootNode.data);
        this.inorderTraversal(rootNode.right);
    }
}

// 中序遍历，非递归方式
BinarySearchTree.prototype.inorderTraversalNoRecusive = function(rootNode){
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

// 后序遍历，非递归方式
BinarySearchTree.prototype.postorderTraversalNoRecusive = function(rootNode){
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

// 后序遍历，递归方式
BinarySearchTree.prototype.postorderTraversal = function(rootNode){
    if(rootNode != null){
        this.postorderTraversal(rootNode.left);
        this.postorderTraversal(rootNode.right);
        console.log(rootNode.data);
    }
}


// 层序遍历
BinarySearchTree.prototype.levelOrderTraversal = function(rootNode){
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
BinarySearchTree.prototype.preorderPrintLeaves = function(rootNode){
    if(rootNode != null){
        if(rootNode.left == null && rootNode.right == null){
            console.log(rootNode.data);
        }
        this.preorderPrintLeaves(rootNode.left);
        this.preorderPrintLeaves(rootNode.right);
    }
}

// 二叉树的高度
BinarySearchTree.prototype.getHeight = function(rootNode){
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