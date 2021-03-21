function toggleCrossOut(event) {
  const _id = event.target.dataset.value;
  const isCrossedOut = event.target.classList.value === 'crossout';
  fetch('toDoList', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: _id,
      isCrossedOut: isCrossedOut,
    }),
  }).then(function () {
    window.location.reload();
  });
}

function addItem() {
  const todoItemText = document.querySelector('.input').value;
  if (todoItemText === '') return alert("Please add a 'To Do Item'");
  fetch('toDoList', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      listItem: todoItemText,
    }),
  }).then(function () {
    window.location.reload();
  });
}

function deleteItem(event) {
  event.stopPropagation();
  let _id = event.target.dataset.value;
  fetch('toDoList', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: _id,
    }),
  }).then(function () {
    window.location.reload();
  });
}

function clearAll(event) {
  fetch('clearAll', {
    method: 'delete',
  }).then(function () {
    window.location.reload();
  });
}

function clearAllCompleted(event) {
  fetch('clearAllCompleted', {
    method: 'delete',
  }).then(function () {
    window.location.reload();
  });
}

// add onClick events

document.querySelector('.addTaskButton').addEventListener('click', addItem);
document.querySelector('#clear-all').addEventListener('click', clearAll);
document
  .querySelector('#clear-all-completed')
  .addEventListener('click', clearAllCompleted);

document.querySelectorAll('.fa-window-close').forEach((element) => {
  element.addEventListener('click', deleteItem);
});

document.querySelectorAll('li').forEach((element) => {
  element.addEventListener('click', toggleCrossOut);
});
