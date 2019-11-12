// 构建一个表示迷宫的矩阵
var maze = [
    [0, 1, 0, 1],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0]
];

// 入口位置
var entrance = new Position(0, 0, 1);
// 出口位置
var exit = new Position(maze.length-1, maze[maze.length-1].length-1);
// 路径栈
var pathStack = new LinkedStack();
pathStack.makeEmpty();

var mazeObj = new Maze(maze,  entrance, exit, pathStack);
var result = mazeObj.path();
// console.log(result);
console.log(result.print());
