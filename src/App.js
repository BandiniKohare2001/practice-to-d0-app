
import './App.css';
import { useState, useEffect } from 'react';
import showToast from "crunchy-toast"
import Card from './components/Card/Card';


function App() {

  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: "Bandini",
      description: "hii Bantu",
      priority: "important"
    }
  ])
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, seDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [edit, setEdit] = useState(false);




  const saveListToLocalStorage = ((task) => {
    const list = localStorage.setItem('tasksave', JSON.stringify(task))
    if (list && list.lenght >= 0) {
      setTaskList(list)
    }
  })

  useEffect(() => {
    const listItem = JSON.parse(localStorage.getItem('tasksave'));
    setTaskList(listItem)
  }, [])






  // clear Screen function
  const cleraInputs = () => {
    setTitle('');
    seDescription('');
    setPriority('');
  }




  // Add to List function
  const addTaskToList = (() => {
    if(!title){
      showToast('title is reruired' , 'Danger', 3000);
      return
    }
    if(!description){
      showToast('Description is reruired' , 'Danger', 3000);
      return
    }
    if(!priority){
      showToast('Pri is reruired' , 'Danger', 3000);
      return
    }
    

    const randomId = Math.floor(Math.random() * 1000);
    const obj = {
      id: randomId,
      title: title,
      description: description,
      priority: priority
    }
    const newList = [...taskList, obj];
    setTaskList(newList)
    saveListToLocalStorage(newList)
    cleraInputs();
    showToast('Task Added Successfully', 'success', 3000)

  })



  //  find Task index By Id
  const findTaskById = (id) => {
    let index;

    taskList.forEach((task, index) => {
      if (task.id === id) {
        index = index
      }
    })
    return index;
  }



  // Remove task Function
  const taskaRemoveFromList = ((id) => {
    const index = findTaskById(id);
    const rawtempArray = taskList;
    rawtempArray.splice(index, 1);

    setTaskList([...taskList])

    showToast('Task Remove from list','alert', 3000)

  })


  const editTask = ((id) => {
    setEdit(true)
   setId(id)
     const editTaskUsingId = findTaskById(id);

     setTitle(editTaskUsingId?.title);
     seDescription(editTaskUsingId?.description);
     setPriority(editTaskUsingId?.priority);
     
      
     console.log(editTaskUsingId)
    
 

  })
  const updateList= ((id)=>{
const up = findTaskById(id)
  })

  return (
    <>
      <div>
        <h1 className='heading'>TO-DO APP</h1>
        <div className='main-container'>
          <div>
            <h2>Show Today Task List</h2>
            <div>
              {
                taskList.map((tasks, i) => {
                  const { id, title, description, priority } = tasks;
                  return (
                    <div>
                      <Card
                        id={id}
                        title={title}
                        description={description}
                        priority={priority}
                        taskaRemoveFromList={taskaRemoveFromList}
                         editTask={editTask}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>




          <hr />



          <div>
            <h2>Add Your Toady Task</h2>
            <div>
              <form>
                <input type='text'
                  value={title}
                  placeholder='Add Title'
                  onChange={(e) => {
                    setTitle(e.target.value)

                  }}
                />
                <br />
                <input type='text'
                  value={description}
                  placeholder='Add Description'
                  onChange={(e) => {
                    seDescription(e.target.value)

                  }}
                />
                <br />
                <input type='text'
                  value={priority}
                  placeholder='Add Title'
                  onChange={(e) => {
                    setPriority(e.target.value)

                  }}
                />
                <br />
                <button type='button' onClick={addTaskToList}>ADD TASK</button>
              </form>
            </div>
          </div>
        </div></div>
    </>
  );
}

export default App;




// localStorage.removeItem('username');
// const removedUsername = localStorage.getItem('username');
// console.log(removedUsername); 
