import React, {useEffect,useState} from 'react'
import {io} from '../../utils/socket'
import Button from '../../components/Button'
import styles from '../../styles/pages/Lobby.module.css'
import {useHistory, Redirect} from 'react-router-dom'
import Footer from '../../components/Footer'

function Lobby({isLogin}: any) {

    const [UUID, setUUId] = useState<string | null>(null)
    const [isCreateRoom, setIsCreateRoom] = useState<boolean>(false)
    const [isJoinRoom, setIsJoinRoom] = useState<boolean>(false)
    const[code, setCode] = useState<string>("")
    const history = useHistory()
     
     useEffect(()=>{
         if(isCreateRoom){
             requestMultiPlayer(isLogin.data)
         }
         // eslint-disable-next-line
     },[isCreateRoom])

   
     const requestMultiPlayer = (data : any)=>{
        const id = Math.random().toString(36).substring(2,8);
        setUUId(id);
        io.emit("create-room", {
            id : id,
            name : data.displayName,
            avatar : data.photos[0].value,
        })
    }

    const joinRoomHandller = ()=>{
        if(code.length !== 6){
            alert("Invalid Code")
            return 
        }
        io.emit("join-room", {
            id : code,
            name : isLogin.data.displayName,
            avatar : isLogin.data.photos[0].value,
        })
    }
    

    useEffect(()=>{
        io.on("room-created", data=>{
            if(data)
              history.push("/game", data)
        })
        // eslint-disable-next-line
    },[])

    

    if(isLogin.islogin === null){
        return <h1>Loading</h1>
    }


    if(isLogin.islogin === false){
        return <Redirect to="/" />
    }

    return (
        <div className={styles.root}>
          
            
                  <Button onClick={()=> {
                      setIsCreateRoom(true)
                      setIsJoinRoom(false)
                      }
                    }>Create Room</Button>
                  <Button onClick={()=> {
                      setIsJoinRoom(true) 
                      setIsCreateRoom(false)
                   }}>Join Room</Button>
         
           
            {

                isCreateRoom &&
                <div className={styles.container}>
                  <h1>CODE : {UUID}</h1>
                  <h1>Creator : {isLogin.data.displayName}</h1>
                  <p>Send This Code To Your Friend To Join.</p>
                </div>
            }
            {
                 isJoinRoom &&
                 <div className={styles.container}>
                   <input className={styles.input} type="text" placeholder="Enter The Code" onChange={(e)=> setCode(e.target.value)} value={code}></input>
                   <Button onClick={joinRoomHandller}>Join</Button>
                 </div>
            }

            <Footer />
           
        </div>
    )
}

export default Lobby
