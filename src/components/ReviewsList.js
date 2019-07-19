import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


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
}));

export default function ReviewsList(props) {
  

  const classes = useStyles();

  return (
    <div>
       
    </div>
  );
}
