// 栈节点
function Node(data, next, previous){
    this.data = data;
    this.next = next;
    this.previous = previous;
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

// 访问栈顶元素，但不弹出
LinkedStack.prototype.top = function(){
    if(!this.isEmpty()){
        return this.tail.previous.data;
    }
    else{
        return null;
    }
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


// 中缀表达式转换为后缀表达式
function InfixToPostfix(expression, stack){
    this.expression = expression; // 输入的后缀表达式
    this.operatorStack = stack; // 操作符栈
}

// 转换为后缀表达式
InfixToPostfix.prototype.toPostfix = function(){

    var str = this.expression;
    var result = []; // 保存输出列表
    var index = 0;
    var part = []; // 保存表达式中以空白字符为分隔符分割的内容

    // 忽略前面的空白字符
    while((part[0] = str[index++]) == ' '){}

    // 如果未到字符串结尾
    while(index <= str.length){

        // 如果未遇到分隔符
        while(!str[index] != ' '){
            part.push(str[index]);
            index++;
            if(index > str.length){
                break;
            }
        }

        // 判断part数组保存的内容
        var target = null;
        // 如果是合法的数值，则直接添加到输出列表中
        if(!isNaN(target = Number.parseFloat(part.join('')))){
            result.push(target);
        }
        // 如果是合法的操作符，则与栈顶元素进行比较
        else if(part[0] == '+' || part[0] == '-'){
            // 如果操作数栈为空或者栈顶元素为左括号，则直接入栈
            if(this.operatorStack.isEmpty() || this.operatorStack.top() == '('){
                this.operatorStack.push(part[0]);
            }
            // 如果操作数栈非空
            else{
                // 弹出操作数栈中的元素，直到遇到元素为左括号或栈为空
                while(!this.operatorStack.isEmpty()){
                    if(this.operatorStack.top() == '('){
                        break;
                    }
                    result.push(this.operatorStack.pop());
                }
                this.operatorStack.push(part[0]);
            }  
        }
        else if(part[0] == '*' || part[0] == '/'){
            // 如果操作数栈为空，则直接入栈
            if(this.operatorStack.isEmpty()){
                this.operatorStack.push(part[0]);
            }
            // 如果操作数栈非空
            else{
                // 如果优先级大于栈顶元素，则入栈
                if(this.operatorStack.top() == '+' || this.operatorStack.top() == '-'  || this.operatorStack.top() == "("){
                    this.operatorStack.push(part[0]);
                }
                else{
                    // 如果优先级小于等于栈顶元素，则弹出栈中元素
                    while(this.operatorStack.top() == '*' || this.operatorStack.top() == '/'){
                        result.push(this.operatorStack.pop());
                    }
                    this.operatorStack.push(part[0]);
                }
            }     
        }
        // 如果当前操作符是左括号，则入栈
        else if(part[0] == '('){
            this.operatorStack.push(part[0]);
        }
        // 如果当前元素是右括号，则弹出栈中的元素直到遇到一个左括号为止
        else if(part[0] == ')'){
            while(this.operatorStack.top() != '('){
                result.push(this.operatorStack.pop());
            }
            this.operatorStack.pop();
        }
        // 非法字符则忽略
        else{
            // do nothing
        }

        // 清空part数组中的内容
        while(!part.length == 0){
            part.pop();
        }

        // 忽略下一部分开始的空白字符
        while((part[0] = str[index++]) == ' '){}
    }
    // 中缀表达式扫描完毕，若操作数栈不为空，则将其输出到结果列表中
    while(!this.operatorStack.isEmpty()){
        result.push(this.operatorStack.pop());
    }

    return result.join(' ');
}