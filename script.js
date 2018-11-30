const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Create new todo item
function newTodo() {
  let node = document.createElement('li');            // create list element
    node.classList.add(classNames.TODO_ITEM);

  let text = document.createElement('INPUT');         // create input text element, with placeholder
    text.setAttribute("type", "text");
    text.setAttribute("placeholder", "What needs doing?");
    text.classList.add(classNames.TODO_TEXT);

  let checkbox = document.createElement('INPUT');     // create checkbox element
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add(classNames.TODO_CHECKBOX);

    // if checkbox is clicked, update # of unchecked todo items
    checkbox.onclick = (function() {
      uncheckedCountSpan.innerHTML = countChecks();
    });

  let deleteBtn = document.createElement('input');    // create delete button element
    deleteBtn.classList.add(classNames.TODO_DELETE);
    deleteBtn.type = "button";
    deleteBtn.value = "Delete";
    // if button is clicked, delete parent element by invoking deleteTodo function
    deleteBtn.onclick = deleteTodo;


  // append checkbox, text, and button to the li element, then append li element to ul element
  node.appendChild(checkbox);
  node.appendChild(text);
  node.appendChild(deleteBtn);
  list.appendChild(node);
  
  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1;            //increment list item count on creation
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;  //increment unchecked item count on creation
}


function deleteTodo() {
  // if checkbox was unchecked, decrement unchecked item count upon deletion
  if(this.parentNode.childNodes[0].checked === false) {
    uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1;
  }
  list.removeChild(this.parentNode);
  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1;      // decrement list item count upon deletion
}

function countChecks() {
  let uncheckedCount = 0;
  
  // for each list item, if checkbox is unchecked, increment unchecked item count by 1
  list.childNodes.forEach(node => {
    if(node.childNodes[0].checked === false) {
      uncheckedCount++;
    }
  })
  return uncheckedCount;
}