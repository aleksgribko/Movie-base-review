import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 500,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  linkMenu: {
    textDecoration: 'none',
  }
}));

function Nav(props) {
  // props: changeGenre={changeGenre}
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const aboutOpen = () => {
    setOpen(true);
  };

  const aboutClose = () => {
    setOpen(false);
  };

  function dropdownClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function dropdownClose(genre) {
    setAnchorEl(null);
    if(genre){
      console.log(genre)
      props.switchGenre(genre);
      props.switchMovie(null)
    }    
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={dropdownClick}>
            Choose a genre
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => dropdownClose(null)}
          >
            <MenuItem onClick={() => dropdownClose('comedies')}><Link className={classes.linkMenu} to={`/genre/comedies`} >Comedies</Link></MenuItem>
            <MenuItem onClick={() => dropdownClose('fantastic')}><Link className={classes.linkMenu} to={`/genre/fantastic`} >Fantastic</Link></MenuItem>
            <MenuItem onClick={() => dropdownClose('mainstream')}><Link className={classes.linkMenu} to={`/genre/mainstream`} >Mainstream</Link></MenuItem>
            <MenuItem onClick={() => dropdownClose('action')}><Link className={classes.linkMenu} to={`/genre/action`} >Action</Link></MenuItem>
            <MenuItem onClick={() => dropdownClose('criminal')}><Link className={classes.linkMenu} to={`/genre/criminal`} >Criminal</Link></MenuItem>
            <MenuItem onClick={() => dropdownClose('drama')}><Link className={classes.linkMenu} to={`/genre/drama`} >Drama</Link></MenuItem>            
          </Menu>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          <Button onClick={aboutOpen} color="inherit">About</Button>
         
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={aboutClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Project to show usage of technologies"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            React, Redux, material ui<br/>
            Made by Aleksandr Gribko<br/>
            <a href='https://agribko.netlify.com'>Visit my Portfolio Website</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={aboutClose} color="primary">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    switchGenre: (newGenre) => {
      dispatch({type:"SWITCH_GENRE", genre: newGenre})
    },
    switchMovie: (newMovie) => {
      dispatch({type: "SWITCH_MOVIE", movie: newMovie})
    },
  }
}

export default connect(null, mapDispatchToProps)(Nav)