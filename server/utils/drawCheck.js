


const drawcheck = (board)=>{
   let filledCells = []; 
   board.forEach((cell,index)=>{
      if(cell !== null){
         filledCells.push(index)
      }
   })

   if(filledCells.length == 9){
       return true
   }else{
       return false
   }


}
export default drawcheck