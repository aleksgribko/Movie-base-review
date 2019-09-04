import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from "react-redux";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
  },
  containerComment: {
    position: 'fixed',
    right: '0',
    left: '0',
    top: '0',
    margin: '0',
    height: '100vh',
    minWidth: '100vw',
    backgroundColor: 'rgb(0,0,0, 0.5)',
    zIndex: '50',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
    display: 'block',
  },
}));

function OverlayComment(props) {
  const [textComment, setTextComment] = useState(null);
  const [typeOfComment, setTypeOfComment] = useState(true);
  const [titleComment, setTitleComment] = useState(null);

  function clearState() {
    setTextComment(null);
    setTitleComment(null);
    document.getElementById('commentTextArea').value = ''
    document.getElementById('commentTextAreaTitle').value = ''
  }

  function handleChange(event) {
    if (event.target.value === 'false') {
      setTypeOfComment(false);
    } else if (event.target.value === 'true') {
      setTypeOfComment(true);
    }
  }

  const classes = useStyles();

  useEffect(() => {
    //set state once
    if (props.commentType.topic && !document.getElementById('commentTextArea').value && !document.getElementById('commentTextAreaTitle').value) {
      console.log('fired')
      document.getElementById('commentTextArea').value = `${props.commentType.description}`
      document.getElementById('commentTextAreaTitle').value = `${props.commentType.topic}`
      setTextComment(props.commentType.description);
      setTitleComment(props.commentType.topic);
      setTypeOfComment(props.commentType.positive)
    }
  })

  function renderOverlay() {
    if (props.commentType.id) {
      return (
        <Container className={classes.containerComment}>
          <Paper className={classes.root}>
            <form autoComplete="off">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">You are leaving a comment to "{props.movie.title}"</FormLabel>
                <RadioGroup
                  aria-label="Comment"
                  name="comment"
                  className={classes.group}
                  defaultValue={props.commentType.positive ? props.commentType.positive : null}
                  value={`${typeOfComment}`}
                  onChange={handleChange}
                >
                  <FormControlLabel value="true" control={<GreenRadio />} label="positive" />
                  <FormControlLabel value="false" control={<RedRadio />} label="negative" />
                </RadioGroup>
              </FormControl>
              <TextField
                id="commentTextAreaTitle"
                label="Give a title to your comment"
                style={{ margin: 8 }}
                placeholder="Hasta la vista, baby"
                onChange={(event) => {
                  setTitleComment(event.target.value.trim())
                }}
                fullWidth
                margin="normal"
                variant="filled"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="commentTextArea"
                label="Leave a comment here"
                fullWidth
                className={classes.textField}
                onChange={(event) => {
                  setTextComment(event.target.value)
                }}
                margin="normal"
                variant="filled"
                multiline
                rows="5"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                props.toggleCommentForm(null)
                if (props.commentType.id === true) {
                  props.addComment(typeOfComment, props.movie.title, titleComment, textComment, 'PE')
                } else {
                  props.editComment(props.commentType.id, typeOfComment, titleComment, textComment)
                }
                clearState()
              }}>
                Send
      </Button>
              <Button variant="contained" color="secondary" className={classes.button} onClick={() => {
                props.toggleCommentForm(null)
                clearState()
              }}>
                Cancel
      </Button>
            </form>
          </Paper>
        </Container>
      )
    } else {
      return <span></span>
    }
  }

  return (
    <React.Fragment>
      {renderOverlay()}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  commentType: state.commentType,
  movie: state.page.currentMovie,
  allComments: state.allComments
})

const mapDispatchToProps = dispatch => {
  return {
    addComment: (positive, forMovie, topic, description, person) => {
      dispatch({ type: 'ADD_COMMENT', positive, forMovie, topic, description, person })
    },
    editComment: (index, typeOfComment, titleComment, textComment) => {
      dispatch({ type: 'EDIT_COMMENT', index, typeOfComment, titleComment, textComment })
    },
    toggleCommentForm: (id, topic, description, positive) => {
      dispatch({ type: 'TOGGLE_COMMENT_FORM', payload: { id, topic, description, positive } })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OverlayComment)
