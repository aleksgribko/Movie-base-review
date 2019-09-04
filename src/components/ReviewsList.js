import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 'inherit',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 'auto',
  },
  listItem: {
    marginBottom: '5px',
  },
  listItemText: {
    wordWrap: 'break-word',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function ReviewsList(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {props.allComments.filter(({ forMovie }) => forMovie === props.movie.title).map(({ id, topic, description, positive }) => (
          <React.Fragment key={id}>
            <ListItem 
              className={classes.listItem} 
              style={positive ? { 'backgroundColor': 'rgb(144, 238, 144, 0.5' } : { 'backgroundColor': 'rgb(255, 8, 0, 0.3)' }}
            >
              <ListItemAvatar>
                <Avatar className={classes.purpleAvatar}>{() => props.user.name.substr(0, 2).toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={topic} secondary={description} className={classes.listItemText} />
              <Button 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={() => props.toggleCommentForm(id, topic, description, positive)}
              >
                Change
              </Button>
              <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon onClick={() => props.deleteComment(id)}/>
              </IconButton>

            </ListItem>
          </React.Fragment>
        ))
        }
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  allComments: state.allComments,
  commentType: state.commentType,
  movie: state.page.currentMovie,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {   
    toggleCommentForm: (id, topic, description, positive) => {
      dispatch({type: 'TOGGLE_COMMENT_FORM', payload: {id, topic, description, positive}})
    },
    deleteComment: (id) => {
      dispatch({type: 'DELETE_COMMENT', payload: {id}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList)
