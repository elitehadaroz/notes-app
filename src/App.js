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
        notes={this.state.notes}>
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
}

export default App;
