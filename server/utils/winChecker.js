

const WININGSENARIO = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9],
]


const checkBoard = (board)=>{
     for(let i=0; i< WININGSENARIO.length; i++){
         const [x,y,z] = WININGSENARIO[i];
         if(board[x-1] && board[x-1] === board[y-1] && board[x-1] === board[z-1]){
             return {
                 isWin : true,
                 winner : board[x-1]
             }
         }
    }
}

export default checkBoard