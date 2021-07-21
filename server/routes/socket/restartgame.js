import playersData from "../../utils/playersData.js"



const restartgame = (io, socket)=>{
    socket.on("restart-game", id=>{
            playersData[id].board = Array(9).fill(null)
            playersData[id].currentTurn = "X"
            io.in(id).emit("re-initialize-game", playersData[id])
    })
}

export default restartgame;