import React, { useState } from 'react';
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
let i:number=0;
let count=0
function App() {
  const [task,setTask]=useState<any>({task:"",id:i})
  const [todo,setTodo]=useState<any>([])
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [rese,setRese]=useState(false)
  function inpTask(event:any):void{
    if(event.which !== 8 &&event.target.value.length >80)
    {
       event.preventDefault();
       
    }else{
      setTask({task:event.target.value,check:false,id:i})
    }
   
  }
 function addTask():void{
  i++;
  task.task===""?alert("Please enter your task"):setTodo([...todo,task])
  setTask({task:"",id:i})
  }
  const handleChange=(event:any):void=>{
  // eslint-disable-next-line array-callback-return
  todo.map((val:any,index:number)=>{
      if(index===Number(event.target.id)){
         todo[index].check=!todo[index].check
         todo[index].check?count++:count--
      }
    })
    setRese(ps=>!ps)
  }
  const handleEdit=(id:number):void=>{
    // eslint-disable-next-line array-callback-return
    todo.map((val:any,index:number)=>{
      if(index===id){
         todo[index].edit=!todo[index].edit
      }
    })
    setRese(ps=>!ps)
  }
  const  handleDelete=(id:number):void=>{
  const d = todo.filter((val:any,index:any)=>todo[index] !== todo[id])
  setTodo(d)
  }
  const textLength=(e:any)=>{
    if(e.which !== 8 &&e.target.innerText.length >80)
    {
       e.preventDefault();
    }
  }
  return (
    <div className='App' >
      <h3>THINGS TO DO</h3>
      <div className='inputContainer'>
      <input type="text" placeholder='Enter your task...' value={task.task} name="task" onChange={inpTask} autoComplete="off" />
      <input type="submit" value="Add task" onClick={addTask}/>
      </div>
      <h3>Plan Done {count}</h3>
      {todo.map((val:any,index:number)=>{
        return(
          <div className='todo' key={index}>
            
            <input type="checkbox" name="check" disabled={val.edit} onClick={handleChange} id={index.toString()}/>
            <p contentEditable={val.edit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault();textLength(e)}} className={val.check?"complete":undefined}>{val.task}</p>
            {!val.check && 
            <div className='btn'>
            {!val.edit && <button onClick={()=>handleDelete(index)}><DeleteIcon/></button>}
            <button className={val.edit ? "editbtn" : ""} onClick={() => handleEdit(index)}><EditIcon/></button>
            </div>
      }
          </div>
        )
        })}
    </div> 
  );
}

export default App;

