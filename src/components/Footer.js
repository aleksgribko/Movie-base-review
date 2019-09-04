import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  footer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  footerBar: {
    top: 'auto',
    bottom: 0,
  },
  link: {
    margin: theme.spacing(1),
  },
  toolbarClass: {
    justifyContent: 'center',
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    
      <Container position="absolute" maxWidth="xl" color="default" className={classes.footerBar}>
        <Toolbar className={classes.toolbarClass}>
          <Typography variant="h6" color="inherit">
            <span
              className={classes.link}   
              style={{'margin': '8px', 'fontSize': '14px'}}                        
            >
              aleks.gribko@gmail.com
          </span>
          <Link
              href='https://agribko.netlify.com/' className={classes.link}
              component="a"
              variant="body2"              
            >
              Portfolio/CV
          </Link>
          <Link
              href='https://twitter.com/Alezh89' className={classes.link}
              component="a"
              variant="body2"              
            >
              twitter
          </Link>
          <Link
              href='https://www.linkedin.com/in/aleksandrgribko/' className={classes.link}
              component="a"
              variant="body2"              
            >
              linkedin
          </Link>
          </Typography>
        </Toolbar>
      </Container>  
  );
}




