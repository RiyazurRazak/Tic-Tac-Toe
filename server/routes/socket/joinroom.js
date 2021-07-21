import playersData from "../../utils/playersData.js"





const joinrooms = (io, socket)=>{
    socket.on("join-room", data=>{
        socket.join(data.id)
        if(playersData[data.id] && playersData[data.id].users.length < 2){
        playersData[data.id].users.push({...data, state: "O"})
        io.in(data.id).emit("room-created" , playersData[data.id])
        }
    })
}

export default joinrooms;