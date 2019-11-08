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

// 后缀表达式
function PostfixExpression(expression, operandStack){
    // 后缀表达式
    this.expression = expression;
    // 操作数栈
    this.operandStack = operandStack;
}

// 后缀表达式计算
PostfixExpression.prototype.calculate = function(){
    // 解析输入的后缀表达式
    var start = 0;
    // 接受合法的字符串
    var result = [];

    // 跳过表达式前的空格
    while((result[0] = this.expression[start++]) == ' ');

    // 未到字符串结尾
    while(start <= this.expression.length -1){
        // 以空白字符为分割符，将后缀表达式切割为多个部分
        while(this.expression[start] != ' '){
            result.push(this.expression[start]);
            start++;
        }

        // 判断result字符串是合法的数值，还是操作符
        var target = null;
        // 如果是合法的数值，则添加到操作数栈中
        if(!isNaN(target = Number.parseFloat(result.join('')))){
            this.operandStack.push(target);
            // 清空result的内容
            while(result.length){
                result.pop();
            }
        }
        else{
            // 如果是合法的操作符，则冲操作数栈中弹出两个数值，与该操作符进行计算，将计算后的结果入栈
            switch(result[0]){
                case '+': {
                    var operand1 = this.operandStack.pop();
                    var operand2 = this.operandStack.pop();
                    var tempResult = operand2 + operand1;
                    this.operandStack.push(tempResult);
                    break;
                }
                case '-': {
                    var operand1 = this.operandStack.pop();
                    var operand2 = this.operandStack.pop();
                    var tempResult = operand2 - operand1;
                    this.operandStack.push(tempResult);
                    break;
                }
                case '*': {
                    var operand1 = this.operandStack.pop();
                    var operand2 = this.operandStack.pop();
                    var tempResult = operand2 * operand1;
                    this.operandStack.push(tempResult);
                    break;
                }
                case '/': {
                    var operand1 = this.operandStack.pop();
                    var operand2 = this.operandStack.pop();
                    var tempResult = operand2 / operand1;
                    this.operandStack.push(tempResult);
                    break;
                }
                default: break;
            }

            // 清空result的内容
            while(result.length){
                result.pop();
            }

        }

         // 跳过表达式前的空格
         while((result[0] = this.expression[start++]) == ' ');
    }

    // 返回表达式结果
    if(!this.operandStack.isEmpty()){
        return this.operandStack.pop();
    }
    else{
        return false;
    }
}