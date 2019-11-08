var list = new LinkedList();
list.makeEmpty();
console.log(list.getLength());

for(let i = 1; i < 5; i++){
    list.insertByStart("i" + i, i);
}
console.log(list.getLength());

for(let i = 1; i <= list.getLength(); i++){
    console.log("index = " + i + "; value = " + list.findKth(i));
}

for(let i = list.getLength(); i >= 1; i--){
    console.log("value = " + list.delete(i) + "; length: " + list.getLength());
}