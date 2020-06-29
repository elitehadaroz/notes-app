
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {

    render() {

        const { _index, _note, classes, selectedNoteIndex } = this.props;

        return(
            <div key={_index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index} //if selectedNoteIndex is equal to current index 
                    alignItems='flex-start'>
                        <div
                            className={classes.textSection}
                            onClick={() => this.selectNote(_note, _index)}>
                                <ListItemText
                                    primary={_note.title}

                                    //note body is the entire text of the note - can be a massive string,
                                    //so will take 30 first char from note text to show on the side bar:
                                    secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}> 
                                </ListItemText>
                        </div>
                        <DeleteIcon
                            onClick={() => this.deleteNote(_note)}
                            className={classes.deleteIcon}>
                        </DeleteIcon>

                </ListItem>
            </div>
        )
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => {
        if(window.confirm(`Are tou sure you want to delete: ${note.title}`)) // verify the note deleting is confirmed
        this.props.deleteNote(note);
    }

}

export default withStyles(styles)(SidebarItemComponent);