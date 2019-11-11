// var ployAdd1 = new PloyAdd();
// ployAdd1.createEmpty();

// var ployAdd2 = new PloyAdd();
// ployAdd2.createEmpty();

// var coefficient1 = [2, -3, 4, -5, -6, 7, -8, 8, 9, 10];
// var exponent1 = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

// for(var i = 0; i < coefficient1.length; i++){
//     ployAdd1.insertByEnd(coefficient1[i], exponent1[i]);
// }

// var coefficient2 = [3, -4, 5, -1, -2, 3, 4, 5, -9, 10];
// var exponent2 = [1, 2, 4, 5, 6, 9, 10, 11, 12, 13];

// for(var i = 0; i < coefficient2.length; i++){
//     ployAdd2.insertByEnd(coefficient2[i], exponent2[i]);
// }

// console.log(ployAdd1.add(ployAdd2).print());

//=====================================

var ployAdd1 = new PloyAdd();
ployAdd1.createEmpty();

var ployAdd2 = new PloyAdd();
ployAdd2.createEmpty();

var expossion1 = " 2x^1 +  -3x^7 + 4x^3 - -5x^6 + 6x^5 + -7X^10";
var expossion2 = " 2x^1 - -4x^7 + 4x^6 + -9x^3 - -10x^5";

ployAdd1.createFromStr(expossion1);
ployAdd1.sort();
console.log(ployAdd1.print());

ployAdd2.createFromStr(expossion2);
ployAdd2.sort();
console.log(ployAdd2.print());

console.log(ployAdd1.add(ployAdd2).print());