// 链式节点
function Node(coefficient, exponent, next, previous){
    this.coefficient = coefficient; // 系数域
    this.exponent = exponent;   // 指数域
    this.next = next;
    this.previous = previous;
}

// 链表结构
function PloyAdd(){
    this.header = null;
    this.tail = null;
    this.currentSize = 0;
}

// 构建一个空白的链表
PloyAdd.prototype.createEmpty = function(){
    this.header = new Node(null, null, null, null);
    this.tail = new Node(null, null, null, null);
    this.header.next = this.tail;
    this.header.previous = this.tail;
    this.tail.next = this.tail.previous = this.header;
    this.currentSize = 0;
}

// 链表是否为空
PloyAdd.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

// 从末尾处插入一个元素
PloyAdd.prototype.insertByEnd = function(coefficient, exponent){
    // 创建一个新节点
    var newNode = new Node(coefficient, exponent, null, null);
    var endNode = this.tail.previous;
    newNode.next = this.tail;
    newNode.previous = endNode;
    this.tail.previous = newNode;
    endNode.next = newNode;
    this.currentSize++;
}

// 多项式相加
PloyAdd.prototype.add = function(anotherPloy){
    if(this.isEmpty() || anotherPloy.isEmpty()){
        console.log("多项式不能为空");
        return false;
    }
    // p1指向当前多项式的第一个节点
    var p1 = this.header.next;
    // p2指向另一个多项式的第一个节点
    var p2 = anotherPloy.header.next;
    // 构建一个结果列表
    var result = new PloyAdd();
    result.createEmpty();

    // 遍历两个多项式
    while(p1 != this.tail && p2 != anotherPloy.tail){
        // 比较p1和p2节点的指数
        if(p1.exponent > p2.exponent){
            result.insertByEnd(p1.coefficient, p1.exponent);
            p1 = p1.next;
        }
        else if(p1.exponent == p2.exponent){
            var sum = p1.coefficient + p2.coefficient;
            if(sum != 0){
                result.insertByEnd(sum, p1.exponent);
            }
            p1 = p1.next;
            p2 = p2.next;
        }
        else{
            result.insertByEnd(p2.coefficient, p2.exponent);
            p2 = p2.next;
        }
    }

    // 如果当前链表还有剩，则将剩下内容一次插入到结果链表中
    while(p1 != this.tail){
        result.insertByEnd(p1.coefficient, p1.exponent);
        p1 = p1.next;
    }

    // 如果另一个链表还有剩，则将剩下内容一次插入到结果链表中
    while(p2 != anotherPloy.tail){
        result.insertByEnd(p2.coefficient, p2.exponent);
        p2 = p2.next;
    }

    return result;
}

// 显示链表的内容
PloyAdd.prototype.print = function(){
    var result = [];
    var index = this.header.next; // 指向第一个节点
    while(index != this.tail){
        result.push(index.coefficient + "X^" + index.exponent);
        index = index.next;
    }
    return result.join(' + ');
}

// 从一个多项式表达式中构建一个链表结构
PloyAdd.prototype.createFromStr = function(expression){

    // 保存一部分内容, 它们以空白字符为分隔符
    var part = [];
    // 保存表达式的遍历指针
    var index = 0;
    // 保存操作数前的操作符
    var operator = '+';

    // 忽略开始的空白字符
    while((part[0] = expression[index++]) == ' '){}

    // 遍历整个表达式
    while(index <= expression.length){

        // 获取以空白字符为分隔符的内容
        while(expression[index] != ' '){
            part.push(expression[index]);
            index++;
            if(index >= expression.length){
                break;
            }
        }

        var tempStr = part.join('');
        // 如果是操作符
        if(tempStr.length == 1){
            // 如果操作符是加号或者减号，则需要将该操作符拼接到下一项的系数中
            if(tempStr == '+' || tempStr == '-'){
                operator = tempStr;
            }
        }
        // 如果不是操作符
        else{
            // 获取分隔符的位置
            var seperatorIndex = -1;
            for(var i = 0; i < tempStr.length; i++){
                if(tempStr[i] == 'X' || tempStr[i] == 'x'){
                    seperatorIndex = i;
                    break;
                }
            }
            // 解析这部分内容，将其分割为系数和指数
            var coefficient = [];
            // 解析系数前的符号
            if(operator == '+'){
                coefficient.push(tempStr[0]);
            }
            else{
                // 加号
                if(tempStr[0] == '+'){
                    coefficient.push(operator);
                }
                // 0到9之间的数字
                else if(!isNaN(Number.parseInt(tempStr[0]))){
                    coefficient.push(operator + tempStr[0]);
                }
                // 减号
                else if(tempStr[0] == '-'){
                    coefficient.push(' ');
                }
            }
            for(var i = 1; i < seperatorIndex; i ++){
                coefficient.push(tempStr[i]);
            }

            var exponent = [];
            for(var i = seperatorIndex + 2; i < tempStr.length; i++){
                exponent.push(tempStr[i]);
            }

            // 判断是否可以组合成一个有效的数值
            var coefficientNum = Number.parseFloat(coefficient.join(''));
            if(isNaN(coefficientNum)){
                console.log("输入了非法的数字");
                return false;
            }

            var exponentNum = Number.parseFloat(exponent.join(''));
            if(isNaN(exponentNum)){
                console.log("输入了非法的数字");
                return false;
            }

            this.insertByEnd(coefficientNum, exponentNum);
        }
        

        // 清空part的内容
        while(part.length != 0){
            part.pop();
        }

        // 忽略开始的空白字符
        while((part[0] = expression[index++]) == ' '){}
    }

}

// 对链表按照指数从大到小进行排序
PloyAdd.prototype.sort = function(){
    for(var p = this.header.next; p != this.tail; p = p.next){
        for(var q = p.next; q != this.tail; q = q.next){
            // 确保p是当前序列中指数最大的节点
            if(p.exponent < q.exponent){
                var tempCofficient = p.coefficient;
                var tempExponent = p.exponent;
                p.coefficient = q.coefficient;
                p.exponent = q.exponent;
                q.exponent = tempExponent;
                q.coefficient = tempCofficient;
            }
        }
    }
}

