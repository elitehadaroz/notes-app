import React, { Component } from 'react';
import './App.css';
import SidebarComponenet from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import editor from './editor/editor';

const firebase = require('firebase');

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }
  render() {
    return (
     <div className = "app-container">
      <SidebarComponenet
        selectedNoteIndex ={this.state.selectedNoteIndex}
        notes={this.state.notes}
        deleteNote={this.deleteNote}
        selectNote={this.selectNote}
        newNote={this.newNote}>
      </SidebarComponenet>

      {
        this.state.selectedNote ? //if we dont have a selected note we dont want to render the editor component
        <EditorComponent
        selectedNote={this.state.selectedNote}
        selectedNoteIndex={this.state.selectedNoteIndex}
        notes={this.state.notes}
        noteUpdate={this.noteUpdate}>
      </EditorComponent> :
      null
      }

     </div>
    );
  }

  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(notes);
      this.setState({notes: notes});
    });
  }
  
  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  noteUpdate = (id, noteObj) => {
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() //firebase function that will generate a timestamp for us on the server
     });
  }

  //create new note when user click on new note btn, and add it to database
  newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };

    
    
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({ //add an item to the collection
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() //firebase function that will generate a timestamp for us on the server
      });

      const newID = newFromDB.id; // we'll need for access to id from firebase
      await this.setState({ notes: [...this.state.notes, note] }); // updating the notes array with what is already in notes + the new note
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]) //filter function will return array of the note whoes id equal to newID
      this.setState({ selectNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex}); //select note by index from all notes to show in editor app
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)}); //set notes state to the note we want to delete
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null }); //removing the note that we deleting from the notes state
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) : // taking selectedNoteIndex - 1, because we already delete one note from note array
      this.setState({ selectedNoteIndex: noteIndex, selectedNote: note});
      
    }

    // delete specific note from firebase:
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
}

export default App;
