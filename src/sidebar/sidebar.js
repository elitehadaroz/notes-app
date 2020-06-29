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
         onKeyUp={(e) => this.updateTitle(e.target.value)}></input> 
        </div> :
        null
      }
    </div>
    );
  }

  newNoteBtnClick = () => {
    console.log('NEW NOTE BTN CLICKED')
    this.setState({ title: null, addingNote: !this.state.addingNote}); //if addingNote equal to false > bacome true, else become false.
  }

  updateTitle = (txt) => {
    console.log('UPDATE TITLE: ', txt);
  }
}

export default withStyles(styles)(SidebarComponent);