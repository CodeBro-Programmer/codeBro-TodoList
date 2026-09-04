let ul = document.getElementById("taskList");
let Btn = document.getElementById("addBtn");
let noInput = document.querySelector(".error");
 let userInput = document.getElementById("taskInput");
 let refreshBtn = document.querySelector(".reload");
 let load = document.querySelector(".loader");

 let rendUserId = localStorage.getItem("user-Id");
 

document.addEventListener("DOMContentLoaded", ()=> {
  // localStorage.removeItem("user-Id");

  checkId();

  load.classList.remove("hidden");

  setTimeout(()=>{
    load.classList.add("hidden");
    rendData();
      
  },600);
 });

refreshBtn.addEventListener('click', ()=> {
   ul.innerHTML = "";
  load.classList.remove("hidden");

  setTimeout(()=>{
    load.classList.add("hidden");
    rendData();
      
  },600);
 
 });



//  FUNCTION THAT GENERATE USER ID
let id = "";

function genId(){

  for(let i = 0; i < 9; i++){
    let randomNum = Math.floor(Math.random()*9);
    
    id += randomNum;
}

return id;

  }

  // FUNCTION THAT CHECKS FOR EXISTING USER ID

  function checkId(){
  // alert(rendUserId);

    if(!rendUserId){
        let rendUserId = genId();
        localStorage.setItem("user-Id",rendUserId);
        alert( rendUserId);
    }
    
  }

 
Btn.addEventListener("click",()=>{
   if( userInput.value === "")
    { let response = "*Input a task to continue";
      noInput.textContent = response; 
    }
      else{
        storeData(userInput.value.trim(),rendUserId);
        rendData();
   }
   
})

// SAVE TASKS
async function storeData(newTask,id) {
  try {
    let res = await fetch("http://localhost:5000/storeTask",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({task: newTask,
                          completed: false,
                          userId: id
    })
  });

  let data = await res.json();
  console.log(data.stat);
  
  } catch (error) {
    console.error("send data error",error);
  }
  
};

// RENDER TASKS
async function rendData() {
  let res = await fetch(`http://localhost:5000/readTask?id=${rendUserId}`);
  let data = await res.json();

  console.log(data);
  console.log(typeof data);

  ul.innerHTML = "";
   
  data.forEach((todo,index) => {
    let li = document.createElement("li");
    li.classList.add("li");
    li.textContent = todo.task ;


    let completeBtn = document.createElement("button");

    completeBtn.textContent = "In progress";
    completeBtn.classList.add("inProgress");

    let button = document.createElement("button");
    button.textContent = "delete";
    button.classList.add("delete");


     let box = document.createElement("article");
      box.classList.add("article");

       box.dataset.index = index;

        if(todo.completed === true){
      completeBtn.textContent = "Completed";
      completeBtn.classList.add("completed");
      completeBtn.disabled = true;
      box.style.borderBottom = "2px solid limegreen";
    };

    box.appendChild(li);
    box.appendChild(completeBtn);
    box.appendChild(button);
    ul.appendChild(box);
    

    userInput.value = "";
    noInput.textContent = "";
  
    

  });
}


// COMPLETE TASKS FUNCTIONALITY
 ul.addEventListener('click',(e)=>{
    if(e.target.classList.contains("inProgress")){
      let Article = e.target.closest("article");
      let theTask = Article.querySelector("li").textContent;
      console.log(theTask);
      complete(theTask,rendUserId);
    }

    if(e.target.classList.contains("delete")){
      let article = e.target.closest("article");
      let thetask = article.querySelector("li").textContent;
      console.log(thetask);
      del(thetask,rendUserId);
    }
  })


async function complete(task,id) {
  try {
    let res = fetch("http://localhost:5000/completeTask",{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({task: task,
      userId: id
    })
  });

  rendData();
  } catch (error) {
    console.log("edit err",error);
  }
  
};


// DELETING FUNCTION

async function del(tsk,id) {
  try {
    let res = fetch("http://localhost:5000/deleteTask",{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({task: tsk,
      userId: id
    })
  });

  rendData();
  } catch (error) {
    console.log("delete err",error);
  }
  
}