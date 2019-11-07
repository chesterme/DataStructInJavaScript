function ArrayList(maxSize){

    // 定义线性表的存储结构
    var data = null;
    var currentSize = null;


    function MyList(){};

    MyList.prototype = {
        // 初始化一个空的线性表
        makeEmpty : function(){
            data = new Array(maxSize);
            currentSize = 0;
        },

        // 检查线性表是否为空
        isEmpty : function(){
            return currentSize == null;
        },

        // 向线性表指定位置插入一个元素
        insert : function(item, index){
            if(index < 0 || index > maxSize){
                return false;
            }
            for(var i = currentSize - 1; i >= index; i++){
                data[i + 1] = data[i];
            }
            data[index] = item;
            currentSize++;
            return true;
        },

        // 向线性表尾部插入一个元素
        insertByEnd : function(item){
            return this.insert(item, currentSize - 1);
        },

        // 向线性表头部插入一个元素
        insertByStart : function(item){
            return this.insert(item, 0);
        },

        // 查找一个元素
        find : function(item){
            for(var i = 0; i < currentSize; i++){
                if(data[i] == item){
                    return i;
                }
            }
            return false;
        },

        // 查找位置k上的元素
        findKth : function(index){
            if(index < 0 || index > currentSize - 1){
                return false;
            }
            return data[index];
        },

        // 删除指定位置上的元素
        delete : function(index){
            // [0, ..., currentSize - 1]
            if(index < 0 || index > currentSize - 1){
                return false;
            }
            for(var i = index; i < currentSize - 1; i++){
                data[i] = data[i + 1];
            }
            currentSize--;
            return true;
        },

        // 线性表长度
        getLength : function(){
            return currentSize;
        }
    };

    MyList.prototype.constructor = MyList;

    // 创建一个空的对象
    var obj = new MyList();

    return obj;
};