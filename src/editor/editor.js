import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            title: '',
            id: ''
        };
    }

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    componentDidUpdate = () => { // when another note is selected by user - we want to change the the selected fields in app
        if(this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            });
        }
    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}>
                </ReactQuill>
            </div>
        );
    }

    updateBody = async(val) => {
        await this.setState({text: val});
        this.update();
    };

    update = debounce(() => {
        this.props.not
 
        //come back later
    }, 1500);
}
export default withStyles(styles)(EditorComponent);