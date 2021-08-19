const buttonOnClick = document.getElementById('submit-button');
const taskManager = new TaskManager(0);
const nameInput = document.getElementById('nameInput');
const descriptionInput = document.getElementById('description-input');
const assignedInput = document.getElementById('assigned-input');
const dueDateInput = document.getElementById('due-date-input');
taskManager.load();
taskManager.render();


const validFormFieldInput = (data) => {
  let name = nameInput.value;
  let description = descriptionInput.value;
  let assignedTo = assignedInput.value;
  let dueDate = dueDateInput.value;
  let dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if ( name === '' || description === '' || assignedTo === '') {
    alert('All fields must be filled out. Please enter an input and re-submit')
    return false;
  } else if ( dueDate === '' || !dateFormat.test(dueDate)) {
    alert('All fields must be filled out. Date format must be in mm/dd/yyyy')
  }  else {
  createTaskManager();
  renderHtml();
  nameInput.value = '';
  descriptionInput.value = '';
  assignedInput.value = '';
  dueDateInput.value = '';
  console.log(taskManager.tasks);
  taskManager.save();
   return true
  }
  
}


const createTaskManager = () => {
  taskManager.addTask(nameInput,descriptionInput,assignedInput,dueDateInput);
}
const renderHtml = () => {
  taskManager.render() ;
}

buttonOnClick.onclick = function(event) {
  event.preventDefault();
  validFormFieldInput();
};

const tasksList = document.getElementById('tasks-list')
tasksList.onclick = (event) => {
  let parentTask = event.target.parentElement.parentElement;
  let taskIdString = parentTask.getAttribute("data-task-id");
  let taskId = Number(taskIdString);
  let task = taskManager.getTaskById(taskId);
  console.log(taskId)
  
  if (event.target.classList.contains('done-button')){
     task.status = 'DONE';
     renderHtml(); 
    taskManager.save();
    
  } else if (event.target.classList.contains('start-button')) {
    task.status = 'STARTED';
     renderHtml();    
    taskManager.save();
  }

  if (event.target.classList.contains('delete-button')){
    console.log(taskId);
    taskManager.deleteTask(taskId);

    taskManager.render();
    taskManager.save();
    

  }

};

console.log('test');

