class Note {
  static counters = 1

  constructor(name, text, date) {
    this.id = Note.counters++
    this.name = name
    this.text = text
    this.isCompleted = false
    this.date = date
    // this.dateCalc = date
  }
}

class List {
  constructor() {
    this.all = {}
  }

  addNote(note) {
    let date = new Date
    let includes = false
    for (let key in this.all) {
      if (key === " " + (note.id).toString()) {
        includes = true
      }
    }
    if (includes === false) {
      note.dateCalc = date.getTime() + Math.random()
      this.all[' ' + (note.id).toString()] = {
        id: note.id,
        name: note.name,
        text: note.text,
        isCompleted: note.isCompleted,
        date: note.date,
        dateCalc: note.dateCalc,
      }
      // [note.id, note.name, note.text, note.isCompleted, note.date]
      return true
    }
    else return false
  }

  isCompleted(noteId) {
    let date = new Date
    for (let key in this.all) {
      if (key === noteId && this.all[noteId].isCompleted === false) {
        this.all[noteId].isCompleted = true
        this.all[noteId].dateCalc = date.getTime() + Math.random()
        return true
      }
    }
    return false
  }

  isNotCompleted(noteId) {
    let date = new Date
    for (let key in this.all) {
      if (key === noteId && this.all[noteId].isCompleted === true) {
        this.all[noteId].isCompleted = false
        this.all[noteId].dateCalc = date.getTime() + Math.random()
        return true
      }
    }
    return false
  }

  removeNote(noteId) {
    for (let key in this.all) {
      if (key === noteId) {
        delete this.all[key]
        return true
      }
    }
    return false
  }

  readNote(noteId) {

    for (let key in this.all) {
      if (key === noteId) {
        return this.all[key]
      }
    }
    return false
  }

  editNote(noteId, text) {
    let date = new Date
    for (let key in this.all) {
      if (key === noteId) {
        this.all[noteId].text = text

        this.all[noteId].dateCalc = date.getTime() + Math.random()
        return true
      }
    }
    return false
  }
  sortNotesByDate() {


    let newObj = {}
    let array = []
    let temp = 1

    for (let key in this.all) {
      array.push(this.all[key].dateCalc)
    }

    let sorted = array.sort(function (a, b) {
      return b - a
    })

    sorted.forEach(element => {
      for (let key in this.all) {
        if (this.all[key].dateCalc === element) {
          newObj[' ' + temp] = this.all[key]
          temp++
        }
      }
    });

    this.all = newObj
    return true
  }

  sortNotesByName() {

    let newObj = {}
    let array = []
    let temp = 1

    for (let key in this.all) {
      array.push(this.all[key].name)
    }
    let sorted = array.sort()

    sorted.forEach(element => {
      for (let key in this.all) {
        if (this.all[key].name === element) {
          newObj[' ' + temp] = this.all[key]
          temp++
        }
      }
    });

    this.all = newObj
    return true
  }

  sortNotesByCompleted() {

    let newObj = {}
    let temp = 1

    for (let key in this.all) {
      if (this.all[key].isCompleted === true) {
        newObj[' ' + temp] = this.all[key]
        temp++
      }
    }
    for (let key in this.all) {
      if (this.all[key].isCompleted === false) {
        newObj[' ' + temp] = this.all[key]
        temp++
      }
    }

    this.all = newObj
    return true
  }
}


// experiments -----------------------------------------------------------------
// let n1 = new Note('a', 'iadsbfoiuasdgifdgbiufads')
// let n2 = new Note('c', 'iadsbfoiuasdgifdgbiufadsldkshfodisn')
// let n3 = new Note('b', 'iadsbfoiuasdgifdgbiufadsodsufhgash')

// let l1 = new List

// l1.addNote(n1)
// l1.addNote(n2)
// l1.addNote(n3)

// l1.isCompleted(' 3')
// l1.sortNotesByName()
// l1.sortNotesByCompleted()

// setTimeout(rtrt, 2000)
// function rtrt(){
//   l1.editNote(' 2', "yeah")
//   l1.sortNotesByDate()
//   console.log(l1)
// }

// console.log(l1)

// experiments -----------------------------------------------------------------






// function variables  -----------------------------------------------------------------
let list = new List()

const body = document.querySelector('body')
const mainButton = document.querySelector('#mainButton')
const noteName = document.querySelector('#noteName')
const noteText = document.querySelector('#noteText')
const allNotes = document.querySelector('#allNotes')
const inputContainer = document.querySelector('#inputContainer')
const editNotes = document.querySelector('#editNotes')
let tempEdit

const sortName = document.querySelector('#sortName')
sortName.addEventListener('click', sortNotesName)

// console.log(inputContainer)

mainButton.addEventListener('click', addNewNote)
noteName.addEventListener('click', enterText)
noteText.addEventListener('click', enterText)


let smallButtons = document.querySelectorAll('.sml-btn')

// functions  --------------------------------------------------------------------------
function addNewNote() {

  let date = new Date
  let name = noteName.value
  let text = noteText.value
  let note = new Note(name, text, date)
  list.addNote(note)

  let newNote = document.createElement('div')
  newNote.classList.add('note')
  newNote.id = " " + note.id
  allNotes.appendChild(newNote)
  newNote.addEventListener('click', noteClicked)

  newNote.innerHTML = '<h3>' + noteName.value + '</h3 ><p>' + noteText.value + '</p><input type="button" value="not completed" class="sml-btn notcCompleted"><input type="button" value="edit" class="sml-btn edit"><input type="button" value="remove" class="sml-btn remove">'

  console.log(list)
}

function enterText(e) {
  if (e.target === noteName) {
    noteName.value = ''
    noteName.removeEventListener('click', enterText)
  }
  else {
    noteText.value = ''
    noteText.removeEventListener('click', enterText)
  }
}

function noteClicked(e) {

  switch (e.target.className) {
    case 'sml-btn remove':
      removeNoteFromPage(e)
      break;

    case 'sml-btn notcCompleted':
      completedNoteFromPage(e)
      break;

    case 'sml-btn edit':
      editNoteFromPage(e)
      break;

    case 'sml-btn stopEdit':
      stopEditNoteFromPage(e)
      break;

    case 'sml-btn completed':
      notCompletedNoteFromPage(e)
      break;

    default:
      console.log('nothing')
  }

}

function removeNoteFromPage(e) {

  list.removeNote(e.target.parentElement.id)
  let removable = document.getElementById(e.target.parentElement.id)
  removable.remove()
}

function completedNoteFromPage(e) {
  list.isCompleted(e.target.parentElement.id)

  e.target.classList.remove('notcCompleted')
  e.target.classList.add('completed')
  e.target.value = 'completed'
}

function notCompletedNoteFromPage(e) {
  list.isNotCompleted(e.target.parentElement.id)

  e.target.classList.remove('completed')
  e.target.classList.add('notcCompleted')
  e.target.value = 'not completed'
}

function editNoteFromPage(e) {

  if (tempEdit !== undefined) {
    tempEdit.value = tempEdit.value + 'finish this first'
  }
  else {
    let thisNote = list.readNote(e.target.parentElement.id)

    let temp = document.createElement('input')
    temp.type = 'text'
    temp.value = thisNote.text
    temp.classList.add('editText')
    editNotes.appendChild(temp)

    e.target.classList.remove('edit')
    e.target.classList.add('stopEdit')
    e.target.value = 'stop edit'

    tempEdit = document.querySelector('.editText')
  }
}

function stopEditNoteFromPage(e) {

  let text = tempEdit.value
  list.editNote(e.target.parentElement.id, text)
  console.log(e.target.parentElement.childNodes[1])
  e.target.parentElement.childNodes[1].innerHTML = text

  e.target.classList.remove('stopEdit')
  e.target.classList.add('edit')
  e.target.value = 'edit'

  editNotes.removeChild(tempEdit)
  tempEdit = undefined

}


function sortNotesName(){
  list.sortNotesByName()
  console.log(list.all)


}