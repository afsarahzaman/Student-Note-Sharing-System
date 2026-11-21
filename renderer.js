// Get HTML elements
const studentName = document.getElementById('studentName');
const noteTitle = document.getElementById('noteTitle');
const subject = document.getElementById('subject');
const noteDetails = document.getElementById('noteDetails');

const addButton = document.getElementById('addButton');
const notesList = document.getElementById('notesList');
const searchBox = document.getElementById('searchBox');

// Load saved notes from browser
let allNotes = JSON.parse(localStorage.getItem('notes')) || [];

// Display notes
function displayNotes(notes) {

    notesList.innerHTML = '';

    if (notes.length === 0) {
        notesList.textContent = 'No notes found.';
        return;
    }

    notes.forEach(function(note) {

        const card = document.createElement('div');
        card.className = 'note-card';

        const title = document.createElement('h3');
        title.textContent = note.title;

        const name = document.createElement('p');
        name.textContent = 'Shared by: ' + note.student;

        const sub = document.createElement('p');
        sub.textContent = 'Subject: ' + note.subject;

        const details = document.createElement('p');
        details.textContent = note.details;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', function() {
            deleteNote(note.id);
        });

        card.appendChild(title);
        card.appendChild(name);
        card.appendChild(sub);
        card.appendChild(details);
        card.appendChild(deleteButton);

        notesList.appendChild(card);

    });
}

// Save notes in browser
function saveNotes() {

    localStorage.setItem('notes', JSON.stringify(allNotes));

}

// Add new note
addButton.addEventListener('click', function() {

    const student = studentName.value.trim();
    const title = noteTitle.value.trim();
    const selectedSubject = subject.value;
    const details = noteDetails.value.trim();

    if (student === '' || title === '' ||
        selectedSubject === '' || details === '') {

        alert('Please fill in all fields!');
        return;
    }

    const newNote = {
        id: Date.now(),
        student: student,
        title: title,
        subject: selectedSubject,
        details: details
    };

    allNotes.push(newNote);

    saveNotes();
    displayNotes(allNotes);

    studentName.value = '';
    noteTitle.value = '';
    subject.value = '';
    noteDetails.value = '';

    alert('Note shared successfully!');

});

// Delete note
function deleteNote(id) {

    allNotes = allNotes.filter(function(note) {
        return note.id !== id;
    });

    saveNotes();
    displayNotes(allNotes);

}

// Search notes
searchBox.addEventListener('input', function() {

    const searchText = searchBox.value.toLowerCase();

    const filteredNotes = allNotes.filter(function(note) {

        return note.title.toLowerCase().includes(searchText);

    });

    displayNotes(filteredNotes);

});

// Show saved notes when website opens
displayNotes(allNotes);