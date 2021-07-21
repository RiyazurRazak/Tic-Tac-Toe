import playersData from "../../utils/playersData.js"





const terminaterooms = (io, socket)=>{
    socket.on("terminate-game", id=>{
        if(playersData[id]){
        delete playersData[id]
        io.in(id).emit("terminated-sucessfully" , true)
        }
    })
}

export default terminaterooms;