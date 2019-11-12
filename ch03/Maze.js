// 当前位置的存储结构
function Position(x, y, fflag){
    this.x = x; // x轴坐标y
    this.y = y; // y轴坐标
}

Position.prototype.toString = function(){
    return "(" + this.x + ", " + this.y + ");";
}

Position.prototype.isSame = function(another){
    if(this.x == another.x){
        if(this.y == another.y){
            return true;
        }
    }
    return false;
    // return this.x == another.x && this.y == another.y;
}

// 记录某个位置是否已经走过了
function Record(position, flag){
    this.position = position; // 标识迷宫的某个位置
    this.flag = flag; // 标识是否已经走过该位置，0|1
}

Record.prototype.isSame = function(another){
    return this.position.isSame(another.position);
}

Record.prototype.isWalked = function(){
    return this.flag;
}

//节点
function Node(data, next, previous){
    this.data = data;
    this.next = next;
    this.previous = previous;
}

// 链表结构
function LinkedList(){
    // 头节点
    this.header = new Node(null, null, null);
    // 尾节点
    this.tail = new Node(null, null, null);
    // 栈大小
    this.currentSize = 0;
}

// 构建一个空白的栈
LinkedList.prototype.makeEmpty = function(){
    this.header.next = this.tail;
    this.header.previous = this.tail;
    this.tail.previous = this.header;
    this.tail.next = this.header;
    this.currentSize = 0;
}

// 链表是否为空
LinkedList.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

// 链表的大小
LinkedList.prototype.getSize = function(){
    return this.currentSize;
}

// 从尾部插入一个元素
LinkedList.prototype.insertByEnd = function(value){
    var tempNode = new Node(value, null, null);
    var endNode = this.tail.previous;
    tempNode.next = this.tail;
    this.tail.previous = tempNode;
    tempNode.previous = endNode;
    endNode.next = tempNode;
    this.currentSize++;
}

// 查找一个元素
LinkedList.prototype.find = function(value){
    var currentNode = this.header.next;
    while(currentNode != this.tail){
        if(currentNode.data.isSame(value)){
            return currentNode;
        }
        currentNode = currentNode.next;
    }
    return false;
}

// 删除一个元素
LinkedList.prototype.delete = function(value){
    var currentNode = this.header;
    while(currentNode != this.tail){
        if(currentNode.next.data.isSame(value)){
            var deletedNode = currentNode.next;
            currentNode.next = deletedNode.next;
            deletedNode.previous = currentNode;
            break;
        }
        currentNode = currentNode.next;
    }
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

// 访问栈顶元素
LinkedStack.prototype.top = function(){
    return this.tail.previous.data;
}

// 显示栈中的所有内容
LinkedStack.prototype.print = function(){
    var str = "";
    // 设定可以移动的方向
    var direction = ["向北移动", "向东移动", "向南移动", "向西移动"];
    var currentNode = this.header.next;
    while(currentNode != this.tail){
        str += ('row: ' + currentNode.data.row + ", col: " + currentNode.data.col + ", dir: " + direction[currentNode.data.dir] + "\n");
        currentNode = currentNode.next;
    }
    return str;
}


// 位置信息和尝试的方向
function MazePosition(row, col, dir){
    this.row = row; // 行号，y轴
    this.col = col; // 列号，x轴
    this.dir = dir; // 尝试的方向
}

MazePosition.prototype.toString = function(){
    return "(行号：" + this.row + ", 列号：" + this.col + ", 方向：" + this.dir + ");";
}

// 构建一个迷宫
function Maze(matrix, entrance, exit, pathStack){
    this.matrix = matrix;     // 二维数组表示迷宫
    this.entrance = entrance; // 入口位置
    this.exit = exit; // 出口位置
    this.pathStack = pathStack;
}

// 比较两个坐标
Maze.prototype.isSame = function(one, another){
    if(one.x == another.x && one.y == another.y){
        return true;
    }
    return false;
}

// 寻找出口
Maze.prototype.path = function(){

    // 构建一个链表，保存已经走过的位置
    var list = new LinkedList();
    list.makeEmpty();
    // 设定可以移动的方向
    var direction = ['N', 'E', 'S', 'W'];
    // 将入口位置和尝试的方向入栈
    var currentPosition = new Position(this.entrance.y, this.entrance.x);
    // 入口位置已经走过了
    list.insertByEnd(new Record(currentPosition, 1));

    // 表示上一步的位置和尝试的方向
    var start = new MazePosition(this.entrance.y, this.entrance.x, 0);
    this.pathStack.push(start);
    // 表示尝试下一步的位置
    var attemptPosition = null; 
    // 该位置的走过记录
    var attemptPositionRecord = null;

    // 如果没有找到出口
    while(!this.isSame(currentPosition, this.exit)){

        // 尝试移动到下一个位置
        switch(direction[start.dir]){
            case 'N': {
                if(start.row - 1 >= 0){
                    attemptPosition = new Position(start.col, start.row - 1); 
                }
                break;
            }
            case 'E': {
                if(start.col + 1 < this.matrix[0].length){
                    attemptPosition = new Position(start.col + 1, start.row);
                }
                break;
            }
            case 'S':{
                if(start.row + 1 < this.matrix.length){
                    attemptPosition = new Position(start.col, start.row + 1);
                }
                break;
            }
            case 'W':{
                if(start.col - 1 >= 0){
                    attemptPosition = new Position(start.col - 1, start.row);
                }
                break;
            }
            default: break;
        }

        // 如果尝试的位置不可行，回溯到上一步
        if(attemptPosition != null){
            attemptPositionRecord = list.find(new Record(attemptPosition, 0)).data;
        }
        if(attemptPosition == null || this.matrix[attemptPosition.y][attemptPosition.x] == 1 || (attemptPositionRecord != null && attemptPositionRecord.isWalked())){
            start = this.pathStack.pop();
            start.dir++;
            // 已经尝试了所有方向
            while(start.dir >= direction.length){
                // 如果栈为空，则说明未找到一条通往出口的可行路径
                if(this.pathStack.isEmpty()){
                    console.log("未找到一条通往出口的可行路径");
                    return false;
                }
                start = this.pathStack.pop();
                start.dri++;
            }
            this.pathStack.push(start);
        }
        // 如果尝试的位置可行，则移动到该位置上，并将该位置信息和下一次尝试移动的方向入栈
        else{
            currentPosition = attemptPosition;
            attemptPosition = null;
            attemptPositionRecord = null;
            list.insertByEnd(new Record(currentPosition, 1));
            start = new MazePosition(currentPosition.y, currentPosition.x, 0);
            this.pathStack.push(start);
        }

    }  

    return this.pathStack;
}

