import playersData from "../../utils/playersData.js"



const createrooms = (io, socket)=>{
    socket.on("create-room", data=>{
            socket.join(data.id)
            playersData[data.id] = {
                users: [{...data, state: "X"}],
                board : Array(9).fill(null),
                currentTurn : "X"
            }
    })
}

export default createrooms;