var list = new ArrayList();

list.makeEmpty(20);

console.log(list.isEmpty());

for(var i = 0; i < 20; i++){
    list.insert(i, i);
}

for(var i = 0; i < list.getLength(); i++){
    console.log("index = " + i + "; value = " + list.findKth(i));
}

for(var i = list.getLength() - 1; i >= 0; i--){
    list.delete(i);
    console.log("length = " + list.getLength());
}

