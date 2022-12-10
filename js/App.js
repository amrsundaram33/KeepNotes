// This is the JavaScript file.
ShowNotes();
let addBtn = document.getElementById('addBtn');
// if (addNote == null) {
//     addBtn.disabled
// }
addBtn.addEventListener('click', function (e) {
    let addNote = document.getElementById('addNote');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addNote.value);
    addNote.value = "";
    localStorage.setItem('notes', JSON.stringify(notesObj));
    console.log(notesObj);
    $('#addBtn,#clrBtn').prop("disabled", true);    
    ShowNotes();
});

function ShowNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>
            `;
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length == 0) {
        notesElement.innerHTML = `Nothing to show, Add some Notes to view.`
    } else {
        notesElement.innerHTML = html;
    }
};

function deleteNote(index) {
    notesObj.splice(index, 1);
    console.log('I am deleting', index)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    ShowNotes();
};

function clrNote() {
    let notesTxt = document.getElementById('addNote');
    notesTxt.value = '';
    $('#addBtn,#clrBtn').prop("disabled", true);
};

let search = document.getElementById('searchBtn');
search.addEventListener('input', function() {
    let searchTxt = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let noteTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (noteTxt.includes(searchTxt)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    });
});

//JQuery starts here
$(document).ready(function () {
    // Enabling the butons
    let typeNote = document.getElementById('addNote');
    typeNote.addEventListener('input',function(){
    if ($('#addNote').val() == '') {
        $('#addBtn,#clrBtn').prop("disabled", true);
    } else {
        $('#addBtn,#clrBtn').prop("disabled", false);
    }
});
    // if ($('#addNote').val() == ''){
    //     $('#addBtn').hide();
    // } else {
    //     $('#addBtn').show();
    // }

});

$('#addNote').change(function () {
    // if ($('#addNote').val() == '') {
    //     $('#addBtn,#clrBtn').prop("disabled", true);
    // } else {
    //     $('#addBtn,#clrBtn').prop("disabled", false);
    // }
});
