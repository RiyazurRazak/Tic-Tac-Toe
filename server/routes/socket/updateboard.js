import drawcheck from "../../utils/drawCheck.js";
import playersData from "../../utils/playersData.js"
import checkBoard from "../../utils/winChecker.js";



let currentTurn;

const updateboard = (io, socket)=>{
    socket.on("update-board", data=>{
        if(playersData[data.id]){
           playersData[data.id].board =  data.board
           const result = checkBoard(data.board)
           if(result && result.isWin){
               const [winner] = playersData[data.id].users.filter((user)=> user.state === result.winner)
               io.in(data.id).emit("game-over", winner)
           }
            else if(drawcheck(data.board)){
                io.in(data.id).emit("draw-match", true)
           }
            else{
              playersData[data.id].currentTurn = data.currentTurn
              if(playersData[data.id].currentTurn === "X"){
                 currentTurn = "O"
              }
              else{
                 currentTurn = "X"
              }
              io.in(data.id).emit("board-updated" , {
                 currentTurn : currentTurn,
                 board : playersData[data.id].board
              })
           }
        }
    })
}

export default updateboard;