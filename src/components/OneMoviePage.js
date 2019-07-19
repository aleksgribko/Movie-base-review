import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import ReviewsList from "./ReviewsList.js"
import OverlayComment from './OverlayComment.js'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  photoMovie: {
    paddingTop: "10px",
    paddingLeft: "10px",
    maxHeight: "50vmin",
    textAlign: "left"
  },
  movieName: {
    fontSize: '3vmax'
  },
  movieTagline: {
    fontSize: '2vmax'
  },
  movieDescr: {
    fontSize: '1vmax'
  },
  button: {
    margin: theme.spacing(1),
    zIndex: '49',
  },
}));

export default function OneMoviePage(props) {
  //props: name: tile.name, descr: tile.descr, pic: tile.pic, tagline: tile.tagline, rank: tile.rank, genreList: props.clickedGenre
  const [title, setTitle] = useState(null);

  const classes = useStyles();

  function commentOverlay(movieName) {
    setTitle(movieName)
  }

  console.log(props);
  return (
    <div>
      <OverlayComment commentOverlay={commentOverlay} title={title} />
      <Paper elevation={0} className={classes.paperBreadcrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="Breadcrumb">
          <Link color="inherit" onClick={props.backToMenu}>
            All Genres
          </Link>
          <Link color="inherit" onClick={props.backToGenre}>
            {props.genre || "Genres"}
          </Link>
          <Typography color="textPrimary">{props.onePage.name}</Typography>
        </Breadcrumbs>
      </Paper>
      <Paper className={classes.root}>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <img
              className={classes.photoMovie}
              src={props.onePage.pic}
              alt={props.onePage.name}
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={() => commentOverlay(props.onePage.name)}>
              Leave a comment
            </Button>
          </div>
          <div style={{ flexGrow: "5" }}>
            <div className={classes.movieName}>
              {props.onePage.name}
            </div>
            <div className={classes.movieTagline}>
              {props.onePage.tagline}
            </div>
            <div className={classes.movieDescr}>
              {props.onePage.descr}
            </div>
          </div>
        </div>
        <ReviewsList />

      </Paper>
    </div>
  );
}



