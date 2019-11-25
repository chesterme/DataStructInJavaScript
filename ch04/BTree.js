// 一个有序对
function PairData(treeNode, keyIndex){
    this.treeNode = treeNode; // B树的结点
    this.keyIndex = keyIndex; // B树结点中关键字序列的某一下标
}

// B树的结点结构
function TreeNode(keyList, pointList, keyNumber, isLeaf){
    this.keyList = keyList;      // 关键字序列
    this.pointList = pointList;  // 指针序列
    this.keyNumber = keyNumber;  // 统计关键字数量
    this.isLeaf = isLeaf;  // 标识是否是叶子结点
}

// B树
function BTree(root, branchNumber){
    this.root = root;
    this.branchNumber = branchNumber;
}

// 创建一个空白的B树
BTree.prototype.create = function(minBranchNumber){
    // 创建一个空白的结点
    var rootNode = new TreeNode(new Array(), new Array(), 0, true);
    // array[0]不参与计算
    rootNode.keyList[0] = rootNode.pointList[0] = null;
    // 使它成为根节点
    this.root = rootNode;
    // 设置B树的最小分支数
    this.minBranchNumber = minBranchNumber;
    // 设置B树的分支数
    this.branchNumber = 2 * minBranchNumber;
}

// 在b树中查找一个元素
// subRoot表示一棵子树的根节点，key表示需要查找的元素
BTree.prototype.search = function(subRoot, key){
    var i = 1;
    // 从当前结点的关键字序列中找到一个最小的i，使得subRoot.key_i >= key
    while(i <= subRoot.keyNumber && subRoot.keyList[i] < key){
        i++;
    }
    // 如果找到了，则直接返回
    if(i <= subRoot.keyNumber && subRoot.keyList[i] == key){
        var result = new PairData(subRoot, i);
        return result;
    }
    // 如果已经来到了树叶结点，说明B树中不存在该元素
    if(subRoot.isLeaf){
        console.log("B树中不存在该元素:" + key)
        return null;
    }
    else{
        return this.search(subRoot.pointList[i], key);
    }
}


// 在b树中分裂一个关键字序列已满的结点
// parentNode表示已满结点的父结点，i表示父结点指针序列的下标，parentNode.point_i指向已满结点
BTree.prototype.splitChild = function(parentNode, i){
    // 需要分裂的结点
    var currentNode = parentNode.pointList[i];
    // t表示B树最小分支数, currentNode[t]为中间元素，需要将它上移到父节点中
    var t = this.minBranchNumber;
    // 建立一个新结点
    var newNode = new TreeNode(new Array(), new Array(), t - 1, currentNode.isLeaf);
    newNode.keyList[0] = newNode.pointList[0] = null;
    // 复制关键字[t+1, 2t-1]到新节点上
    for(var j = 1; j <= t - 1; j++){
        newNode.keyList[j] = currentNode.keyList[t + j];
    }
    // 删除已经复制的元素
    for(var j = t - 1; j >= 1; j--){
        currentNode.keyList.pop();
    }

    // 如果是非叶子结点，则需要复制指针域
    if(!currentNode.isLeaf){
        // 复制指针[t+1, 2t]到新结点上
        for(var j = 1; j <= t; j++){
            newNode.pointList[j] = currentNode.pointList[t + j];
        }
        // 删除已经复制的元素
        for(var j = t; j >= 1; j--){
            currentNode.pointList.pop();
        }
    }
    // 将新节点插入到当前结点的父结点上
    for(var j = parentNode.keyNumber + 1; j >= i + 1; j--){
        parentNode.pointList[j + 1] = parentNode.pointList[j];
    }
    parentNode.pointList[j + 1] = newNode;

    // 将关键字插入到父结点上
    var midKey = currentNode.keyList.pop();
    currentNode.keyNumber = t - 1;

    for(var j = parentNode.keyNumber; j >= i; j--){
        parentNode.keyList[j + 1] = parentNode.keyList[j];
    }
    parentNode.keyList[j + 1] = midKey;
    parentNode.keyNumber++;
}


// 插入一个元素
BTree.prototype.insert = function(key){
    // 从B树的根节点开始往下搜索关键字的位置
    var rootNode = this.root;
    // 如果根节点的关键字序列已满，则需要分裂成两个子结点，然后重置一个根节点
    if(rootNode.keyNumber == this.branchNumber - 1){
        // 新建一个结点作为B树的根节点
        var newNode = new TreeNode(new Array(), new Array(), 0, false);
        newNode.keyList[0] = newNode.pointList[0] = null;
        newNode.pointList[1] = rootNode;
        this.root = newNode;
        // 分裂已满的结点
        this.splitChild(newNode, 1);
        // 往已完成分裂的B树中插入关键字key
        this.insertNonFull(newNode, key);
    }
    else{
        this.insertNonFull(rootNode, key);
    }
}

// 往子树中插入一个关键字
BTree.prototype.insertNonFull = function(subRoot, key){
    var i = subRoot.keyNumber;
    // 如果是叶子结点，则不需要处理指针域
    if(subRoot.isLeaf){
        // 插入到关键字序列
        while(i >= 1 && subRoot.keyList[i] > key){
            subRoot.keyList[i + 1] = subRoot.keyList[i]
            i--;
        }
        subRoot.keyList[i + 1] = key;
        subRoot.keyNumber++;
    }
    else{
        // 找到下一个子结点
        while(i >= 1 && subRoot.keyList[i] > key){
            i--;
        }
        i++;
        // 如果已满，则需要分裂
        if(subRoot.pointList[i].keyNumber == this.branchNumber - 1){
            this.splitChild(subRoot, i);
            if(subRoot.keyList[i] < key){
                i++;
            }
        }
        this.insertNonFull(subRoot.pointList[i], key);
    }
}

// 构建一个队列
function LinkedNode(data, next, previous){
    this.data = data;
    this.next = next;
    this.previous = previous;
}

function LinkedQueue(header, tail, currentSize){
    this.header = header;
    this.tail = tail;
    this.currentSize = currentSize;
}

LinkedQueue.prototype.makeEmpty = function(){
    this.header = new LinkedNode(null, null, null);
    this.tail = new LinkedNode(null, null, null);
    this.header.next = this.tail;
    this.tail.previous = this.header;
    this.currentSize = 0;
}

// 入队
LinkedQueue.prototype.enqueue = function(value){
    var tempNode = new LinkedNode(value, this.tail, this.tail.previous);
    this.tail.previous.next = tempNode;
    this.tail.previous = tempNode;
    this.currentSize++;
}

// 出队
LinkedQueue.prototype.dequeue = function(){
    var deletedNode = this.header.next;
    this.header.next = deletedNode.next;
    deletedNode.next.previous = this.header;
    this.currentSize--;
    return deletedNode;
}

LinkedQueue.prototype.isEmpty = function(){
    return this.header.next == this.tail;
}

// B树的层次遍历
BTree.prototype.levelOrderTravel = function(rootNode){
    if(rootNode == null){
        rootNode = this.root;
    }

    var queue = new LinkedQueue();
    queue.makeEmpty();

    queue.enqueue(rootNode);

    while(!queue.isEmpty()){
        var linkedNode = queue.dequeue();
        for(var i = 1; i <= linkedNode.data.keyNumber; i++){
            console.log("关键字： " + linkedNode.data.keyList[i]);
            if(linkedNode.data.pointList[i] != null){
                queue.enqueue(linkedNode.data.pointList[i]);
            }
        }
        if(linkedNode.data.pointList[i] != null){
            queue.enqueue(linkedNode.data.pointList[i]);
        }
    }
}

// 找出最大元素
// subRoot表示一棵子树的根节点
BTree.prototype.findMax = function(subRoot){
    if(subRoot.isLeaf){
        return subRoot.keyList[subRoot.keyNumber];
    }
    else{
        return this.findMax(subRoot.pointList[subRoot.keyNumber + 1]);
    }
}

// 找出最小元素
// subRoot表示一棵子树的根节点
BTree.prototype.findMin = function(subRoot){
    if(subRoot.isLeaf){
        return subRoot.keyList[1];
    }
    else{
        return this.findMin(subRoot.pointList[1]);
    }
}

// 删除最大元素
BTree.prototype.deleteMax = function(subRoot){
    if(subRoot.isLeaf){
        var max = subRoot.keyList.pop();
        subRoot.keyNumber--;
        return max;
    }
    else{
        return this.deleteMax(subRoot.pointList[subRoot.keyNumber + 1]);
    }
}

// 删除最小元素
BTree.prototype.deleteMin = function(subRoot){
    if(subRoot.isLeaf){
        var min = subRoot.keyList[1];
        for(var i = 1; i < subRoot.keyNumber; i++){
            subRoot.keyList[i] = subRoot.keyList[i + 1];
        }
        subRoot.keyList.pop();
        subRoot.keyNumber--;
        return min;
    }
    else{
        return this.deleteMin(subRoot.pointList[1]);
    }
}

// 从一棵子树中删除一个元素
BTree.prototype.delete = function(subRoot, k){
    if(subRoot == null){
        console.log("子树不能为空");
        return false;
    }

    // t表示B树可容纳最小分支数
    var t = this.minBranchNumber;
    // 遍历当前结点
    var isFound = false;
    var i = null;
    for(i = 1; i <= subRoot.keyNumber; i++){
        if(subRoot.keyList[i] == k){
            isFound = true;
            break;
        }
    }

    // 如果在当前结点内找到k
    if(isFound){
        // 如果是叶子结点，则直接从关键字序列中删除k
        if(subRoot.isLeaf){
            for(var j = i; j < subRoot.keyNumber; j++){
                subRoot.keyList[j] = subRoot.keyList[j + 1];
            }
            subRoot.keyList.pop();
            subRoot.keyNumber--;

            return ;
        }

        // 如果是内部结点
        else{
            // y为关键字k的紧邻前驱，包含小于k的关键字元素
            var y = subRoot.pointList[i];
            // z为关键字k的紧邻后继，包含大于k的关键字元素
            var z = subRoot.pointList[i + 1];
            // 如果k的前驱至少有t个关键字，则将它最大的一个元素上移，替换要删除的关键字k
            if(y.keyNumber >= t){
                var max = this.findMax(y);
                this.delete(y, max);
                subRoot.keyList[i] = max;
            }
            // 如果k的后继至少有t个关键字，则将它最小的一个元素上移，替换要删除的关键字k
            else if(z.keyNumber >= t){
                var min = this.findMin(z);
                this.delete(z, min);
                subRoot.keyList[i] = min;
            }
            // 如果k的前驱和后继都只有t-1个关键字，则将前驱j、关键字k和后继z合并成一个结点，然后在新节点中删除k
            else if(z.keyNumber == y.keyNumber && z.keyNumber == t-1){
                // 合并关键字k
                var j = y.keyNumber + 1;
                y.keyList[j++] = k;
                // 合并后继结点z中的关键字
                for(var m = 1; m <= z.keyNumber; m++){
                    y.keyList[j++] = z.keyList[m];
                }
                y.keyNumber += (1 + z.keyNumber);

                // 从当前结点中删除k，即删除subRoot.keyList[i]
                for(var j = i; j < subRoot.keyNumber; j++){
                    subRoot.keyList[j] = subRoot.keyList[j + 1];
                }
                subRoot.keyList.pop();

                // 删除关键字k的后继结点，即删除subRoot.pointList[i + 1]
                for(var j = i + 1; j <= subRoot.keyNumber; j++){
                    subRoot.pointList[j] = subRoot.pointList[j + 1];
                }
                subRoot.pointList.pop();

                // 更新关键字数目
                subRoot.keyNumber--;

                // 如果当前节点的关键字列表为空，则以它的左儿子作为根节点
                // if(subRoot.keyNumber == 0){
                //     this.root = subRoot.pointList[1];
                // }

                // 从合并的结点中删除k
                return this.delete(y, k);
            }
        }
    }
    // 如果在当前结点中没有找到k，即k可能在它的子结点中
    else{
        // 找出对应的子结点
        var m = null;
        for(m = 1; m <= subRoot.keyNumber; m++){
            if(subRoot.keyList[m] > k){
                break;
            }
        }

        // 对应的子结点
        var target = subRoot.pointList[m];
         // 它的左兄弟
         var y = subRoot.pointList[m - 1];
         // 它的右兄弟
         var z = subRoot.pointList[m + 1];
        // 如果它只有t-1个关键字，即只含最小数量的关键字，若直接删除，则不符合约束，因此它需要向相邻结点借一个关键字，
        if(target.keyNumber == t-1){
            // 如果左兄弟的关键字数量至少为t，即它可以借一个关键字给当前结点
            // 可以将它的最大关键字上移至父结点，将父结点的key[m - 1]下移至target结点，然后从target结点中删除k
            if(y != null && y.keyNumber >= t){
                var max = y.keyList.pop();  
                // 将父结点的关键字key[i - 1]下移至target结点上
                var j = null;
                for(j = target.keyNumber; j >= 1; j--){
                    target.keyList[j + 1] = target.keyList[j];
                }
                target.keyList[1] = subRoot.keyList[m -1];
                subRoot.keyList[m - 1] = max;

                // 如果y是内部结点，还需要移动指针序列
                if(!y.isLeaf){
                    var maxPoint = y.keyList.pop();
                    for(j = target.keyNumber + 1; j >= 1; j--){
                        target.pointList[j + 1] = target.pointList[j]; 
                    }
                    target.pointList[1] = maxPoint;
                }
                y.keyNumber--;

                target.keyNumber++;
                return this.delete(target, k);
            }
            // 如果右兄弟的关键字数量至少为t，即它可以借一个关键字给当前结点
            // 将它的最小关键字上移至父结点，将父结点的key[m]下移至target结点，然后从target结点中删除k
            else if(z != null && z.keyNumber >= t){
                var min = z.keyList[1];
                var j = null;
                for(j = 1; j < z.keyNumber; j++){
                    z.keyList[j] = z.keyList[j + 1];
                }
                z.keyList.pop();

                // 将父结点的关键字key[m]下移至target结点上
                target.keyList.push(subRoot.keyList[m]);
                subRoot.keyList[m] = min;

                // 如果z是内部结点，还需要移动指针
                if(!z.isLeaf){
                    var minPoint = z.pointList[1];
                    for(j = 1; j <= z.keyNumber; j++){
                        z.pointList[j] = z.pointList[j + 1];
                    }
                    z.pointList.pop();
                    target.pointList.push(minPoint);
                }
                z.keyNumber--;

                target.keyNumber++;
                return this.delete(target, k);
            }
            // 如果相邻结点的关键字数量都是t-1，则将它与其中一个相邻结点合并，然后从新节点中删除k
            // 子结点只有一个右兄弟结点
            if(m == 1){
                // 合并target结点、父结点的keyList[m]、z结点
                if(z != null && z.keyNumber == t - 1){
                    // 合并
                    target.keyList.push(subRoot.keyList[m]);
                    for(var j = 1; j <= z.keyNumber; j++){
                        target.keyList.push(z.keyList[j]);
                    }

                    if(!z.isLeaf){
                        for(var j = 1; j <= z.keyNumber + 1; j++){
                            target.pointList.push(z.pointList[j]);
                        }
                    }
                    target.keyNumber += (1 + z.keyNumber);

                    // 从父结点中删除关键字keyList[m]
                    for(var j = m; j < subRoot.keyNumber; j++){
                        subRoot.keyList[j] = subRoot.keyList[j + 1];
                    }
                    subRoot.keyList.pop();

                    // 从父结点中删除结点z
                    for(var j = m + 1; j <= subRoot.keyNumber; j++){
                        subRoot.pointList[j] = subRoot.pointList[j + 1];
                    }
                    subRoot.pointList.pop();
                    subRoot.keyNumber--;

                    if(subRoot.keyNumber == 0){
                        this.root = subRoot.pointList[1];
                        subRoot = null;
                    }

                    // 从合并后的结点中删除k
                    return this.delete(target, k);
                }
            }
            // 如果子结点在最右侧
            else if(m == subRoot.keyNumber + 1){
                // 合并y、父节点的keyList[m]、target结点
                if(y != null && y.keyNumber == t - 1){
                    // 合并
                    y.keyList.push(subRoot.keyList[m - 1]);
                    for(var j = 1; j <= target.keyNumber; j++){
                        y.keyList.push(target.keyList[j]);
                    }

                    if(!target.isLeaf){
                        for(var j = 1; j <= target.keyNumber + 1; j++){
                            y.pointList.push(target.pointList[j]);
                        }
                    }
                    y.keyNumber += (1 + target.keyNumber);

                    // 从父结点中删除关键字keyList[m - 1]
                    for(var j = m - 1; j < subRoot.keyNumber; j++){
                        subRoot.keyList[j] = subRoot.keyList[j + 1];
                    }
                    subRoot.keyList.pop();

                    // 从父结点中删除结点target
                    for(var j = m; j <= subRoot.keyNumber; j++){
                        subRoot.pointList[j] = subRoot.pointList[j + 1];
                    }
                    subRoot.pointList.pop();
                    subRoot.keyNumber--;

                    target = y;
                    if(subRoot.keyNumber == 0){
                        this.root = subRoot.pointList[1];
                        subRoot = null;
                    }

                    // 从合并后的结点中删除k
                    return this.delete(target, k);
                }
            }

            // 如果子节点在中间
            else if(m > 1 && m <= target.keyNumber){
                // 合并target结点、父结点的keyList[m]、z结点
                if(z != null && z.keyNumber == t - 1){
                    // 合并
                    target.keyList.push(subRoot.keyList[m]);
                    for(var j = 1; j <= z.keyNumber; j++){
                        target.keyList.push(z.keyList[j]);
                    }

                    if(!z.isLeaf){
                        for(var j = 1; j <= z.keyNumber + 1; j++){
                            target.pointList.push(z.pointList[j]);
                        }
                    }
                    target.keyNumber += (1 + z.keyNumber);

                    // 从父结点中删除关键字keyList[m]
                    for(var j = m; j < subRoot.keyNumber; j++){
                        subRoot.keyList[j] = subRoot.keyList[j + 1];
                    }
                    subRoot.keyList.pop();

                    // 从父结点中删除结点z
                    for(var j = m + 1; j <= subRoot.keyNumber; j++){
                        subRoot.pointList[j] = subRoot.pointList[j + 1];
                    }
                    subRoot.pointList.pop();
                    subRoot.keyNumber--;

                    if(subRoot.keyNumber == 0){
                        this.root = subRoot.pointList[1];
                        subRoot = null;
                    }

                    // 从合并后的结点中删除k
                    return this.delete(target, k);
                }

                // 合并y、父节点的keyList[m]、target结点
                else if(y != null && y.keyNumber == t - 1){
                    // 合并
                    y.keyList.push(subRoot.keyList[m]);
                    for(var j = 1; j <= target.keyNumber; j++){
                        y.keyList.push(target.keyList[j]);
                    }

                    if(!target.isLeaf){
                        for(var j = 1; j <= target.keyNumber + 1; j++){
                            y.pointList.push(target.pointList[j]);
                        }
                    }
                    y.keyNumber += (1 + target.keyNumber);

                    // 从父结点中删除关键字keyList[m]
                    for(var j = m; j < subRoot.keyNumber; j++){
                        subRoot.keyList[j] = subRoot.keyList[j + 1];
                    }
                    subRoot.keyList.pop();

                    // 从父结点中删除结点target
                    for(var j = m + 1; j <= subRoot.keyNumber; j++){
                        subRoot.pointList[j] = subRoot.pointList[j + 1];
                    }
                    subRoot.pointList.pop();
                    subRoot.keyNumber--;


                    target = y;
                    if(subRoot.keyNumber == 0){
                        this.root = subRoot.pointList[1];
                        subRoot = null;
                    }

                    // 从合并后的结点中删除k
                    return this.delete(target, k);
                }
            }
        }
        else{
            return this.delete(target, k);
        }
    }
}