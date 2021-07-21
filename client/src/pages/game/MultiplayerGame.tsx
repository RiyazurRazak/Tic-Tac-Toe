import React, {useState, useEffect} from 'react'
import { Redirect, useLocation, useHistory} from 'react-router-dom'
import Square from '../../components/Square'
import styles from '../../styles/pages/Game.module.css'
import Header from '../../components/Header'
import {io} from '../../utils/socket'
import {Dialog, DialogTitle, DialogActions} from '@material-ui/core'
import Button from '../../components/Button'
import Footer from '../../components/Footer'


interface TUser{
    name: String
    state:String
    avatar:String
}

function Game({isLogin}:any) {


    const location = useLocation()
    const history = useHistory()
    const data : any = location.state
    const [board, setBoard] = useState(data.board)
    const [CurrentPlayer, setCurrentPlayer]=useState<string>(data.currentTurn)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [winner, setWinner]=useState<TUser| null>(null)
    const [isDraw, setisDraw] = useState<boolean>(false)
    const currentUser = data.users.filter((user: TUser)=> user.name === isLogin.data.displayName)



    useEffect(()=>{
        window.addEventListener('beforeunload', (event)=>{
            const e = event || window.event;
            e.preventDefault();
            if (e) {
               e.returnValue = ''; 
             }
             return '';        
           })
        return ()=>{
            io.emit("terminate-game", data.users[0].id)
            window.removeEventListener("beforeunload", ()=>{
            })
        }
        // eslint-disable-next-line
     },[])


     useEffect(()=>{
         io.on("terminated-sucessfully", data =>{
             if(data){
                 alert("Someone left/Game Ended. Redirecting to lobby....")
                 setTimeout(()=>{
                    history.push("/lobby")
                 },2000)
             }
         })
         // eslint-disable-next-line
     },[])

     useEffect(()=>{
        io.on("board-updated", data =>{
            setBoard(data.board)
            setCurrentPlayer(data.currentTurn)
        })
     },[])

     useEffect(()=>{

        io.on("game-over", data =>{
            setWinner(data)
            setIsGameOver(true)
        })
     },[])

     useEffect(()=>{
        io.on("draw-match", data =>{
            if(data){
               setisDraw(true)
               setIsGameOver(true)
            }
        })
     },[])

     useEffect(()=>{
        io.on("re-initialize-game", data =>{
            setIsGameOver(false)
            setWinner(null)
            setBoard(data.board)
            setisDraw(false)
            setCurrentPlayer(data.currentTurn)
        })
     },[])

 
     const boardUpdateHandller = (index : number)=>{
         if(CurrentPlayer === currentUser[0].state){
             let newboard = [...board]
             newboard[index] = currentUser[0].state
             io.emit("update-board", {
                id : currentUser[0].id,
                board : newboard,
                currentTurn : CurrentPlayer
             })
         }
     }

     const restartGameHandller = ()=>{
        io.emit("restart-game", currentUser[0].id)
     }


     if(isLogin.islogin === null){
         return <h1>Loading</h1>
     }


     if(isLogin.islogin === false){
         return <Redirect to="/" />
     }

    return (
       
        <div>
            <Header userData={data.users} />
          <div className={styles.board}>
               {
                   board.map((square : any, index : number)=>{
                       return(
                           <Square key={index} value={square} onClick={() => boardUpdateHandller(index)}  />
                       )
                   })
               }
          </div>

          <h3 className={styles.turnText}>{CurrentPlayer} Turn Now</h3>

          <Footer />

          <Dialog open={isGameOver}>
              <DialogTitle>{ isDraw ? `Game Over Match Draw` : `Game Over ${winner?.name} WON`}</DialogTitle>
              <DialogActions className={styles.dialog}>
                  {
                      currentUser[0].state === 'X' ?
                      <Button onClick={restartGameHandller}>Restart</Button>
                      :
                      <h3>Wait until restart</h3>
                  }
              </DialogActions>
          </Dialog>
        </div>
      
    )
}

export default Game
