var btree = new BTree();
btree.create(3);

// var input = new Array();
// for(var i = 10; i < 200; i += 10){
//     input.push(i);
// }

var input = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


for(var i = 0; i < input.length; i++){
    btree.insert(input[i]);
    console.log("插入关键字：" + input[i] +  "后，b树层次遍历: ");
    btree.levelOrderTravel();
}

for(var i = 0; i < input.length; i++){
    var pairData = btree.search(btree.root, input[i]);
    console.log(pairData.treeNode.keyList);
}

console.log("b树层次遍历: ");
btree.levelOrderTravel();

for(var i = 0; i < input.length; i++){
    btree.delete(btree.root, input[i]);
    console.log("删除元素" + input[i] + "后，b树层次遍历: ");
    btree.levelOrderTravel();
}