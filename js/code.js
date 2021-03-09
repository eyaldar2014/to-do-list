class Note {
  static counters = 1

  constructor(name, text) {
    this.id = Note.counters++
    this.name = name
    this.text = text
    this.isCompleted = false
    this.date
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
      note.date = date.getTime()  + Math.random()
      this.all[' ' + note.id] = [note.id, note.name, note.text, note.isCompleted, note.date]
      return true
    }
    else return false
  }

  isCompleted(noteId) {
    let date = new Date
    for (let key in this.all) {
      if (key === noteId && this.all[key][3] === false) {
        this.all[key][3] = true
        this.all[key][4] = date.getTime() + Math.random()
        return true
      }
    }
    return false
  }

  isNotCompleted(noteId) {
    let date = new Date
    for (let key in this.all) {
      if (key === noteId && this.all[key][3] === true) {
        this.all[key][3] = false
        this.all[key][4] = date.getTime() + Math.random()
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
    console.log(this.all[noteId])

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
        this.all[key][2] = text

        this.all[key][4] = date.getTime() + Math.random()
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
      array.push(this.all[key][4])
    }

    let sorted = array.sort(function (a, b) {
      return b - a
    })

    sorted.forEach(element => {
      for (let key in this.all) {
        if (this.all[key][4] === element) {
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
      array.push(this.all[key][1])
    }
    let sorted = array.sort()

    sorted.forEach(element => {
      for (let key in this.all) {
        if (this.all[key][1] === element) {
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
      if (this.all[key][3] === true) {
        newObj[' ' + temp] = this.all[key]
        temp++
      }
    }
    for (let key in this.all) {
      if (this.all[key][3] === false) {
        newObj[' ' + temp] = this.all[key]
        temp++
      }
    }

    this.all = newObj
    return true
  }
}