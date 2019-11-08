var generalizedList = new GeneralizedList();

generalizedList.makeEmpty();

console.log("length: " + generalizedList.getLength());

generalizedList.insertByStart("丁一");
var list1 = new LinkedList();
list1.makeEmpty();
var array1 = ["张三", "李四"];
for(var i = 0; i < array1.length; i++){
    list1.insertByStart(array1[i]);
}
generalizedList.insertAList(list1, 1);


var list2 = new LinkedList();
list2.makeEmpty();
var array2 = ["王五", "赵六"];
for(var i = 0; i < array2.length; i++){
    list2.insertByStart(array2[i]);
}
generalizedList.insertAList(list2, 2);

console.log("length: " + generalizedList.getLength());

var currentNode = generalizedList.header.next;
while(currentNode != generalizedList.tail){
    console.log(generalizedList.showMessage(currentNode));
    currentNode = currentNode.next;
}