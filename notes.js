const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes..'
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log(chalk.green('New note added successfully.'));
    } else {
        console.log(chalk.red('Note title exists. Please try with a different title!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    let isRemoved = false;
    const nl = notes.length;
    for (i = nl - 1; i >= 0; i--) {
        if (notes[i].title === title) {
            notes.splice(i, 1);
            isRemoved = true;
        }
    }

    if (isRemoved) {
        saveNotes(notes);
        console.log(chalk.green('"' + title + '" removed successfully'));
    } else {
        console.log(chalk.red('"' + title + '" not found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    if (notes.length) {
        console.log(chalk.blue.inverse('Your notes:'));
        notes.forEach((note) => {
            console.log(note.title);
        });
    } else {
        console.log(chalk.red('No notes found!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red('"' + title + '" not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};