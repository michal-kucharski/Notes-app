"use strict";

const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const noteId = location.hash.substring(1);
const lastEdited = document.querySelector("#last-edited");
let notes = getSavedNotes();
let note = notes.find(function(note) {
  return note.id === noteId;
});

if (!note) {
  location.assign("/index.html");
}

noteTitle.value = note.title;
noteBody.value = note.body;
lastEdited.textContent = lastEditedUpdate(note.updatedAt);

noteTitle.addEventListener("input", e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = lastEditedUpdate(note.updatedAt);
  saveNotes(notes);
});
noteBody.addEventListener("input", e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = lastEditedUpdate(note.updatedAt);
  saveNotes(notes);
});

document.querySelector("#remove-note").addEventListener("click", () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/index.html");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);

    if (!note) {
      location.assign("/index.html");
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
    lastEdited.textContent = lastEditedUpdate(note.updatedAt);
  }
});
