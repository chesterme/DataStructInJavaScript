var input = [1, 4, 2, 5, 3, 1, 9, 10, 7, 8.0, -3, -4, -1];

// 简单排序
function sort(input){
    var i = j = null;
    var temp = null;
    for(i  = 0; i < input.length; i++){
        // 确保input[i]是当前序列中最小的元素
        for(j = i + 1; j < input.length; j++){
            if(input[i] > input[j]){
                temp = input[i];
                input[i] = input[j];
                input[j] = temp;
            }
        }
    }
}

input.sort();
console.log(input)

// 二分查找
function binarySearch(input, value){
    var left = 0;
    var right = input.length - 1;
    var mid = null;

    // 在序列列中进行查找
    while(left <= right){
        mid = (left + right) / 2;
        if(value > input[mid]){
            left = mid + 1;
        }
        else if(value == input[mid]){
            return mid;
        }
        else {
            right = mid - 1;
        }
    }

    // 找不到则返回-1
    return -1;

}
