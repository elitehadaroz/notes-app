import React, { Component } from 'react';
import './App.css';
import SidebarComponenet from './sidebar/sidebar';
import EditorComponent from './editor/editor';

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
     <div calssNeame = "app-container">
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
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]) //filter will return array of the note whoes id equal to newID
      this.setState({ selectNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }
}

export default App;
