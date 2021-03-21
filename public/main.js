document.querySelector(".addTaskButton").addEventListener('click', addItem) // document.querySelector("#list").addEventListener("click", check)
document.querySelector("#deleteAll").addEventListener("click", deleteAll)

const li = document.querySelectorAll("li")
const trash = document.getElementsByClassName('fa-window-close')
const deleteDone = document.querySelector("#deleteDone").addEventListener("click", doneItem)
const input = document.querySelector(".input")
const ul = document.querySelector("#list")

// let count = 0

Array.from(trash).forEach(function(element) { //danstan help//
      element.addEventListener('click', function(){
        const item = this.parentNode.innerText
        console.log(item)
        console.log(this.parentNode.innerText)
        fetch('toDoList', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'listItem': item
          })
        }).then(function (response) {
        console.log(response)
          // window.location.reload()
        })
      });
});

Array.from(li).forEach(function(element){
  element.addEventListener('click',toggleCrossOut)
})

function toggleCrossOut(event){ // if the word is clicked on and not crossed out,  it will crossout. If crossed out already it will undo it//
  console.log("event works",event.target)
  let _id = event.target.dataset.value
  fetch('toDoList',{
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id:_id
    })
  }
)
}


function addItem() {
  if (input.value === "") return alert("Please add a 'To Do Item'")
  fetch('toDoList', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'listItem': input.value ,
    })
  })
}


// function check(e) { // refers specifically to the box appended to the <li>
//   console.log(e)
//   if (e.target.className === "listItem") {
//     e.target.style.textDecoration = "line-through"
//     e.target.className = "completed"
//     count()
//   } else {
//     e.target.style.textDecoration = "none"
//     e.target.className = "listItem"
//     count()
//   }
// }

function count() {
  let doneTotal = document.getElementsByClassName("completed").length //we know is an array since we are getting getElements and its a list of items>
  document.querySelector("#total").innerText = doneTotal
}


function deletedListItem(e) {
  const listItemToDelete = e.target.parentElement
  ul.removeChild(listItemToDelete)
  count() //call the count function again to make sure the count gets updated
}

function deleteAll() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
    count()
  }
}

function doneItem() {
  const completedStorage = document.querySelectorAll(".completed")
  console.log(completedStorage)
  for (let completed of completedStorage) { //mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of      //t
    ul.removeChild(completed)
  }
  count()
}





// https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
