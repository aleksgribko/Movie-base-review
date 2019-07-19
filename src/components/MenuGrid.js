import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { filmsGridData } from "./filmsGridData.js";
import getMovies from "./filmsData.js";
import GenreGrid from "./GenreGrid.js";
import OneMoviePage from "./OneMoviePage.js"

// films API:
// process.env.REACT_APP_FILMS_API_KEY
// example https://api.themoviedb.org/3/movie/76341?api_key=process.env.REACT_APP_FILMS_API_KEY

const useStyles = makeStyles(theme => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    maxWidth: "100%",
    height: "100%"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  img: {
    transition: 'transform .2s',
    margin: '0 auto',
    '&:hover': {
       transform: 'scale(2.0, 2.0)',      
    },
  }
}));

export default function MenuGrid(props) {
    const classes = useStyles();
  return(<div className={classes.root} id='menuFilms'>
          <GridList cellHeight={250} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div">{props.genre || "Genres"}</ListSubheader>
            </GridListTile>

            {filmsGridData.map(tile => (
              <GridListTile
                key={tile.img}
                onClick={() => {                  
                  props.filmPage(tile.search, tile.title)                  
                }}
              >
                <img className={classes.img} src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={
                    <span>number of movies: {tile.moviesId.length}</span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${tile.title}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>)}
