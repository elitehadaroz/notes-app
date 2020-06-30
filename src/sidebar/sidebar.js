import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem'

class SidebarComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      addingNote: false,
      title: null
    };
  }
  render() {

    const { notes, classes, selectedNoteIndex} = this.props;
    
    if(notes){ //first time calling sidebarContainer notes will be null so we need to check first
      return(
        <div className={classes.sidebarContainer}>
          <Button
          onClick={this.newNoteBtnClick}
          className={classes.newNoteBtn}>
            {this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {
            this.state.addingNote ? 
            <div>
              <input type='text'
                className={classes.newNoteInput}
                placeholder='Enter note title'
                onKeyUp={(e) => this.updateTitle(e.target.value)}>
              </input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}>
                  Submit Note
    
              </Button>
            </div> :
            null
          }
    
          <List>
            {
              notes.map((_note, _index) => {
                return(
                  //for each note we create side bar item:
                  <div key={_index}> 
                    <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}>
                    </SidebarItemComponent>
                    <Divider></Divider>
    
                  </div>
                )
              })
            }
          </List>
        </div>
        );
    } else {
      return(<div></div>)
    }
  }

  newNoteBtnClick = () => {
    console.log('NEW NOTE BTN CLICKED')
    this.setState({ title: null, addingNote: !this.state.addingNote}); //if addingNote equal to false > bacome true, else become false.
  }

  updateTitle = (txt) => {
    this.setState({ title: txt});
  }

  newNote = () => {
    this.props.newNote(this.state.title); //intalize new note title
    this.setState({title: null, addingNote: false}); // reset
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  }

  deleteNote = () => {
    console.log('delete note')
  }
}

export default withStyles(styles)(SidebarComponent);