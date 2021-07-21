import React, {useState} from 'react'
import Header from '../../components/Header'
import Square from '../../components/Square'
import styles from '../../styles/pages/Game.module.css'
import checkBoardHandller from '../../utils/checkboard'
import {Dialog, DialogTitle, DialogActions} from '@material-ui/core'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

function SinglePlayer() {


    const [board, setBoard] = useState(Array(9).fill(null))
    const [isBotTurn, setIsBotTurn]=useState(false)
    const [isWin, setIsWin] = useState<boolean>(false)
    const [winner, setWinner] = useState<string|null>(null)
    const [isGameDraw, setIsGameDraw] = useState<boolean>(false)

    const userData = [
        {
         name : 'YOU',
         avatar : "/placeholder.png", 
        },{
         name : "BOT",
         avatar : "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
       }
    ]


    const boardUpdateHandller = (index : number)=>{
         if(!isBotTurn){
            let newboard : any[] = [...board]
            newboard[index] = "X"
            setBoard(newboard)
            const result = checkBoardHandller(newboard)
            if(result && result?.isWin){
                if(result.winner === 'X')
                    setWinner("You")
                else
                    setWinner('BOT')    
                setIsWin(result.isWin)
                return 
            }
            botupdateHandller(newboard)
         }
    }

    const botupdateHandller = (newboard : any[])=>{
          let filledCells : number[] = []; 
           newboard.forEach((cell,index)=>{
              if(cell !== null){
                 filledCells.push(index)
              }
          })
          if(filledCells.length === 9){
               setIsGameDraw(true)
               setIsWin(true)
              return 
          }
          setIsBotTurn(true)
          let index = (Math.round(Math.random() * 8))
          while(filledCells.includes(index)){
               index = (Math.round(Math.random() * 8))
          }
          setTimeout(()=>{
            newboard[index] = "O"
            setBoard(newboard)
            setIsBotTurn(false)
            const result = checkBoardHandller(newboard)
            if(result && result?.isWin){
                if(result.winner === 'X')
                    setWinner("You")
                else
                    setWinner('BOT')    
                setIsWin(result.isWin)
                return 
            } 
          },1000)       
    }


    const restartGameHandller = ()=>{
        setBoard(Array(9).fill(null))
        setWinner(null)
        setIsWin(false)
        setIsGameDraw(false)
        setIsBotTurn(false)
    }

    
    return (
        <div>
            <Header userData={userData} />
             <div className={styles.board}>
               {
                   board.map((square : any, index : number)=>{
                       return(
                           <Square key={index} value={square} onClick={() => boardUpdateHandller(index)}  />
                       )
                   })
               }
          </div>

          <h3 className={styles.turnText}>{isBotTurn ? "BOT" : "Your"} Turn Now</h3>


          <Footer />

          <Dialog open={isWin}>
              <DialogTitle>{ isGameDraw ? `Game Draw` :`Game Over ${winner} WON`}</DialogTitle>
              <DialogActions className={styles.dialog}>
                     <Button onClick={restartGameHandller}>Restart</Button>
              </DialogActions>
          </Dialog>
        </div>
    )
}

export default SinglePlayer
