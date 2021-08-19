
const createTaskHtml = (id,name, description, assignedTo, dueDate, status) => {
  const html = `
  <li data-task-id="${id}"  class="classList card rounded border-info ">   
    <div class="card-body ">
      <h6 class="card-subtitle status">Status: </h6>  
        <span class="status-display ">${status}</span>   
      <h4 class="card-title">${name}</h4>  
        
      <p class="card-text">${description}</p>
      <h6 class="card-subtitle mb-2 text-muted">Assigned To: ${assignedTo}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Due Date: ${dueDate}</h6>  
      <button  type="button" class="start-button btn btn-primary status-button">Start Task</button>
      <button  type="button" class="done-button btn btn-success status-button ">Mark As Done</button>
      <button type="button" class="delete-button btn btn-danger status-button ">Delete</button>
    </div>
  </li>`
  return html;
};


class TaskManager {
  constructor(currentId) {
    this.currentId = 0;
    this._tasks = [];
  }
  

 
  get tasks() {
   return this._tasks;
 } 

 set tasks(input) {
this._tasks = input;
 }

  addTask(name,description,assignedTo,dueDate) {
    const task = { 
      id: this.currentId++,
      name: name.value,
      description: description.value,
      assignedTo: assignedTo.value,
      dueDate: dueDate.value,
      status: 'TODO',
      }
    this.tasks.push(task);
  }

  render() {
    let tasksHtmlList = [];
    for (let i=0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      let currentTask = task.name ;
      let date = task.dueDate 
      let formattedDate = new Date(date).toString();

      let taskHtml = createTaskHtml(task.id,currentTask,task.description,task.assignedTo, date,task.status)
      tasksHtmlList.push(taskHtml);
      }
    let tasksHtml = tasksHtmlList.join('\n');
    document.getElementById('tasks-list').innerHTML = tasksHtml;    
    }

  getTaskById (taskId) {
    let foundTask = '';
    for (let i=0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }    
    }
    return foundTask;     
  }



    save () {
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    let currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId);
    }
    
    load() {
      if(localStorage.getItem("tasks")){
        let tasksJson = localStorage.getItem("tasks");
        this.tasks =JSON.parse(tasksJson);
      }
      if(localStorage.getItem("currentId")){
        let currentId = localStorage.getItem("currentId");
        this.currentId = Number(currentId);
      }
    }
    
    deleteTask(taskId) {
      let newTasks = [];
      for (let i = 0; i < this.tasks.length; i++) {
        let task = this.tasks[i];
        if (task.id != taskId){
         newTasks.push(task);
         
        }
      }
      this.tasks = newTasks;
    }
}


