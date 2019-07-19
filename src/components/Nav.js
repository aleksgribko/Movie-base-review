import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';


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
}));

export default function Nav() {
  const [open, setOpen] = React.useState(false); 

  const aboutOpen = () => {
    setOpen(true);
  };

  const aboutClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           
          </Typography>
          <Button onClick={aboutOpen} color="inherit">About</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={aboutClose}
      >
        <div className={classes.paper}>
          <Typography variant="h6" align="center" id="modal-title">
            Project to show usage of technologies
          </Typography>
          <Typography variant="subtitle1" id="modal-description">
            <p>react, material ui, node.js, express.js, MongoDB, API</p>
            <p>Made by Aleksandr Gribko</p>
            <a href='https://agribko.netlify.com'>Site</a>
          </Typography>
          
        </div>
      </Modal>
    </div>
  );
}