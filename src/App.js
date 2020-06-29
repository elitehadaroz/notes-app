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
        notes={this.state.notes}>
      </SidebarComponenet>

      <EditorComponent></EditorComponent>
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
}

export default App;
