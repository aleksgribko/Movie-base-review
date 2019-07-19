import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ReviewsList from "./ReviewsList.js";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

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
    width: '100vw',
    right: '0',
    left: '0',
    height: '100%',
    backgroundColor: 'rgb(0,0,0, 0.5)',
    zIndex: '50',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'block',
    winWidth: '100%',
    display: 'block',
    marginLeft: '0',
    marginRight: '0',
    maxHeight: '50vh',
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

export default function OverlayComment(props) {
  //commentOverlay={commentOverlay} title={title}
  const [selectedValue, setSelectedValue] = useState(null);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  const classes = useStyles();

  return (
    <Container style={props.title ? {'display': 'block'} : {'display': 'none'}} className={classes.containerComment}>
      <Paper className={classes.root}>     
       <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">You are leaving a comment to {props.title}</FormLabel>
        <RadioGroup
          aria-label="Comment"
          name="comment"
          className={classes.group}
          value={selectedValue}
          onChange={handleChange}
        >
          <FormControlLabel value="positive" control={<GreenRadio />} label="positive" />
          <FormControlLabel value="negative" control={<RedRadio />} label="negative" />         
        </RadioGroup>
      </FormControl>
       
        <TextField
          id="outlined-textarea"
          label="Leave a comment here"
          placeholder="..."
          multiline
          fullWidth
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
         <Button variant="contained" color="primary" className={classes.button}>
        Send
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => props.commentOverlay(null)}>
        Cancel
      </Button>
   
      </Paper>
    </Container>
  );
}
