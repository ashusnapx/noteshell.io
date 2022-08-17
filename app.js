// console.log('helo');

/* list of all ids and classes
ids   - addBtn,addTxt,notes,searchTxt
class - container my-3,row container-fluid
*/

showNotes();

// masti
let heading = document.querySelector('h1');
heading.addEventListener('click', () => console.log('aa gye n console check krne, op bhai!'));

// if user adds a note, add it to the local storage
let addBtn = document.querySelector('#addBtn');

// add a event listener to button
addBtn.addEventListener('click', (e) => {
  let addTxt = document.querySelector('#addTxt');

  // check whether we've any notes from beginning
  let notes = localStorage.getItem('notes');

  // if our notes output comes to be null then set an empty string
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);

  // convert notesObj to string because localStorage only accepts strings.
  localStorage.setItem('notes', JSON.stringify(notesObj));

  // make the value of addTxt = '', because as the user adds the note the text area should be clear
  addTxt.value = '';

  // console.log(notesObj);

  showNotes();
});


// function to show notes from local storage
function showNotes() {
  // check whether we've any notes from beginning
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }

  let html = '';

  notesObj.forEach((element, index) => {
    html += `
    <div class="noteCard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Notes${index + 1} 😻</h5>
                    <p class="card-text">${element}</p>
                    <button id = "${index}"onclick = "deleteNote(this.id)" class="btn btn-primary">Delete ❌</button>
                </div>
      </div>`;
  });

  let notesElm = document.querySelector('#notes');

  // check if notes is empyty ie. length of notes is 0
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `Nothing to show. Write something and click on 'Add Note' to see the magic.`;
  }
}

  // function to delete a node
function deleteNote(index) {
  // console.log(`user is deleting the content.`, index);
  let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    }
    else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// function to search
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value;
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  })
})
